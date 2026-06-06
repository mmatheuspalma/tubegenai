/**
 * LLM-assisted scene enhancement suggestions via OpenAI.
 * Key is session-only — never committed to the repo.
 */

import { PRIMITIVES, getPrimitive } from '../extension/primitives.js';
import { mapScriptToScenes } from './mapScriptToScenes.js';
import { validateSuggestion } from './heuristics.js';

const PRIMITIVE_CATALOG = PRIMITIVES.map((p) => ({
  id: p.id,
  category: p.category,
  label: p.label,
  defaultProps: p.defaultProps,
  canApplyNote:
    p.id === 'crossfade'
      ? 'Only when current scene type is image AND next scene type is image.'
      : undefined,
}));

function buildPrompt(scenes, scriptText) {
  const mapped = mapScriptToScenes(scenes, scriptText);
  const sceneBrief = mapped.map(({ scene, index, scriptChunk }) => ({
    sceneId: scene.id,
    index: index + 1,
    type: scene.type,
    startFrame: scene.startFrame,
    durationFrames: scene.durationFrames,
    narration: scriptChunk,
    nextType: scenes[index + 1]?.type ?? null,
  }));

  return `You are a video editor assistant. Given a voiceover script split across fixed scenes, suggest enhancements using ONLY the primitives in the catalog.

Return JSON: { "suggestions": [ ... ] }

Each suggestion:
{
  "sceneId": string,
  "kind": "effect" | "transition" | "overlay" | "sceneType",
  "primitiveId": string,
  "props": object (use catalog defaultProps as base, tweak if helpful),
  "reason": string (one short sentence),
  "startFrame": number (overlays/sceneType only),
  "durationFrames": number (overlays/sceneType only)
}

Rules:
- One effect per scene max. One transition per scene max (on the outgoing scene).
- Overlays/sceneTypes: 0–2 total across the whole video, only when narration warrants it.
- Match mood: this video is about dogs barking at night — lean cool/night grades, restrained motion.
- Respect crossfade canApply (image→image only); use slideLeft, fadeToBlack, or zoomBlur elsewhere.
- Do NOT suggest auto-captions.

Primitive catalog:
${JSON.stringify(PRIMITIVE_CATALOG, null, 2)}

Scenes:
${JSON.stringify(sceneBrief, null, 2)}

Full script:
${scriptText}`;
}

export async function suggestWithAI(scenes, scriptText, apiKey) {
  if (!apiKey?.trim()) throw new Error('OpenAI API key required');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content:
            'You suggest video editor enhancements. Output valid JSON only. Use primitive ids exactly as given.',
        },
        { role: 'user', content: buildPrompt(scenes, scriptText) },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from OpenAI');

  const parsed = JSON.parse(content);
  const raw = parsed.suggestions ?? [];

  return raw
    .map((s, i) => {
      const primitive = getPrimitive(s.primitiveId);
      if (!primitive) return null;
      const kind =
        s.kind === 'sceneType'
          ? 'sceneType'
          : s.kind === 'overlay'
            ? 'overlay'
            : s.kind === 'transition'
              ? 'transition'
              : 'effect';

      return {
        id: `${s.sceneId}:${kind}:${s.primitiveId}:${i}`,
        sceneId: s.sceneId,
        sceneIndex: scenes.findIndex((sc) => sc.id === s.sceneId),
        kind,
        primitiveId: s.primitiveId,
        label: primitive.label,
        props: { ...primitive.defaultProps, ...s.props },
        startFrame: s.startFrame,
        durationFrames: s.durationFrames,
        reason: s.reason ?? 'AI suggestion',
      };
    })
    .filter(Boolean)
    .filter((s) => validateSuggestion(s, scenes));
}
