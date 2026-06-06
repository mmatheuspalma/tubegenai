/**
 * Build caption segments timed to the voiceover from script.txt.
 * Distributes phrases across total duration by character weight (no word-level STT).
 */

import { mapScriptToScenes } from './mapScriptToScenes.js';

const MAX_CHARS = 52;

/** Split text into short readable caption lines. */
export function splitIntoPhrases(text) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const phrases = [];
  for (const sentence of sentences) {
    if (sentence.length <= MAX_CHARS) {
      phrases.push(sentence);
      continue;
    }
    const parts = sentence.split(/,\s+/);
    let buf = '';
    for (const part of parts) {
      const next = buf ? `${buf}, ${part}` : part;
      if (next.length <= MAX_CHARS) {
        buf = next;
      } else {
        if (buf) phrases.push(buf);
        buf = part;
      }
    }
    if (buf) phrases.push(buf);
  }
  return phrases;
}

/** Scene-aligned captions — one block of phrases per visual scene window. */
export function buildSceneAlignedCaptions(scenes, scriptText) {
  const mapped = mapScriptToScenes(scenes, scriptText);
  const segments = [];

  for (const { scene, scriptChunk } of mapped) {
    if (!scriptChunk.trim()) continue;
    const phrases = splitIntoPhrases(scriptChunk);
    const totalChars = phrases.reduce((s, p) => s + p.length, 0) || 1;
    let offset = 0;

    phrases.forEach((text, i) => {
      const isLast = i === phrases.length - 1;
      const share = text.length / totalChars;
      const dur = isLast
        ? scene.durationFrames - offset
        : Math.max(15, Math.round(scene.durationFrames * share));
      if (dur < 10) return;
      segments.push({
        text,
        startFrame: scene.startFrame + offset,
        durationFrames: dur,
      });
      offset += dur;
    });
  }

  return segments;
}

/** Voiceover-aligned captions — smooth flow across full narration duration. */
export function buildVoiceoverCaptions(totalFrames, scriptText) {
  const body = scriptText.replace(/^Title:.*(\n|$)/m, '').trim();
  const phrases = splitIntoPhrases(body);
  if (phrases.length === 0) return [];

  const totalChars = phrases.reduce((s, p) => s + p.length, 0);
  let frame = 0;

  return phrases.map((text, i) => {
    const isLast = i === phrases.length - 1;
    const dur = isLast
      ? totalFrames - frame
      : Math.max(18, Math.round((text.length / totalChars) * totalFrames));
    const segment = { text, startFrame: frame, durationFrames: dur };
    frame += dur;
    return segment;
  });
}

/** Default: voiceover-aligned for even narration flow (avoids scene-mapping duplication). */
export function buildCaptionsFromScript(scenes, scriptText, totalFrames) {
  return buildVoiceoverCaptions(totalFrames, scriptText);
}
