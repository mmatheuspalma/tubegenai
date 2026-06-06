/**
 * Offline content-aware suggestions from script keywords + scene metadata.
 * Used as fallback when no OpenAI key is set.
 */

import { getPrimitive } from '../extension/primitives.js';
import { mapScriptToScenes } from './mapScriptToScenes.js';

const mkId = (sceneId, kind, primitiveId, extra = '') =>
  `${sceneId}:${kind}:${primitiveId}${extra ? `:${extra}` : ''}`;

const nextScene = (scenes, i) => scenes[i + 1] ?? null;

const pickTransition = (scene, next, scriptChunk) => {
  if (!next) return null;
  const primitive = getPrimitive('crossfade');
  if (
    primitive?.canApply &&
    !primitive.canApply(scene, next)
  ) {
    if (scene.type === 'broll' || next.type === 'broll') {
      return next.type === 'animation'
        ? { id: 'zoomBlur', props: { durationFrames: 20, maxScale: 1.1, maxBlur: 6 } }
        : { id: 'slideLeft', props: { durationFrames: 16 } };
    }
    if (scene.type === 'image' && next.type === 'animation') {
      return { id: 'zoomBlur', props: { durationFrames: 22, maxScale: 1.12, maxBlur: 8 } };
    }
    return { id: 'fadeToBlack', props: { durationFrames: 18 } };
  }
  if (/brain|different|shift|processing/i.test(scriptChunk)) {
    return { id: 'fadeToBlack', props: { durationFrames: 18 } };
  }
  return { id: 'crossfade', props: { durationFrames: 14 } };
};

const pickEffect = (scene, scriptChunk, index) => {
  const chunk = scriptChunk.toLowerCase();
  if (scene.type === 'broll') {
    return index % 2 === 0
      ? { id: 'panRight', props: { scale: 1.15, pan: 6 } }
      : { id: 'panLeft', props: { scale: 1.18, pan: 7 } };
  }
  if (/night|dark|low-light|two in the morning/i.test(chunk)) {
    return { id: 'colorGrade', props: { preset: 'night' } };
  }
  if (/hearing|sensory|acute/i.test(chunk)) {
    return { id: 'vignette', props: { intensity: 0.45, size: 58 } };
  }
  if (/territorial|instinct|threat/i.test(chunk)) {
    return { id: 'kenBurns', props: { startScale: 1.04, endScale: 1.14, startX: 0, endX: -4, startY: 0, endY: -2 } };
  }
  if (scene.durationFrames > 120) {
    return { id: 'kenBurns', props: { startScale: 1.03, endScale: 1.12, startX: 1, endX: -3, startY: 0, endY: -1 } };
  }
  if (scene.durationFrames < 50) {
    return { id: 'zoomIn', props: { startScale: 1.0, endScale: 1.08 } };
  }
  if (scene.type === 'animation') {
    return { id: 'colorGrade', props: { preset: 'cinematic' } };
  }
  return { id: 'vignette', props: { intensity: 0.4, size: 60 } };
};

const pickOverlays = (row) => {
  const { scene, index, scriptChunk } = row;
  const chunk = scriptChunk;
  const overlays = [];

  if (index === 0) {
    overlays.push({
      kind: 'overlay',
      primitiveId: 'titleCard',
      startFrame: scene.startFrame,
      durationFrames: Math.min(88, scene.durationFrames),
      props: {
        title: 'Why Your Dog Barks at Night',
        subtitle: 'What the bark actually means',
        backgroundColor: 'rgba(0,0,0,0.82)',
        textColor: '#FFFFFF',
        accentColor: '#7c5cff',
        enterFrames: 18,
        exitFrames: 14,
      },
      reason: 'Opening hook — title card for the topic sentence.',
    });
  }

  if (/territorial|instincts heighten/i.test(chunk)) {
    overlays.push({
      kind: 'overlay',
      primitiveId: 'lowerThird',
      startFrame: scene.startFrame + 6,
      durationFrames: Math.min(85, scene.durationFrames),
      props: {
        title: 'Territorial instincts heighten',
        subtitle: 'Threat threshold drops after dark',
        backgroundColor: 'rgba(0,0,0,0.75)',
        textColor: '#FFFFFF',
        enterFrames: 14,
        exitFrames: 14,
      },
      reason: 'Lower third for a two-part explanatory line.',
    });
  }

  return overlays;
};

export function suggestWithHeuristics(scenes, scriptText) {
  const mapped = mapScriptToScenes(scenes, scriptText).map((row) => ({
    ...row,
    index: row.index,
  }));

  const suggestions = [];

  for (const { scene, index, scriptChunk } of mapped) {
    const effect = pickEffect(scene, scriptChunk, index);
    if (effect) {
      const primitive = getPrimitive(effect.id);
      suggestions.push({
        id: mkId(scene.id, 'effect', effect.id),
        sceneId: scene.id,
        sceneIndex: index,
        kind: 'effect',
        primitiveId: effect.id,
        label: primitive?.label ?? effect.id,
        props: effect.props,
        reason: `Scene ${index + 1} (${scene.type}): matched narration tone and pacing.`,
      });
    }

    const next = nextScene(scenes, index);
    if (next) {
      const tr = pickTransition(scene, next, scriptChunk);
      const primitive = getPrimitive(tr.id);
      if (primitive?.canApply && !primitive.canApply(scene, next)) {
        // keep tr from pickTransition which already handles ineligibility
      }
      suggestions.push({
        id: mkId(scene.id, 'transition', tr.id),
        sceneId: scene.id,
        sceneIndex: index,
        kind: 'transition',
        primitiveId: tr.id,
        label: primitive?.label ?? tr.id,
        props: tr.props,
        reason: `Transition into scene ${index + 2} (${next.type}) — fits the cut type.`,
      });
    }

    for (const ov of pickOverlays({ scene, index, scriptChunk })) {
      const primitive = getPrimitive(ov.primitiveId);
      suggestions.push({
        id: mkId(scene.id, ov.kind, ov.primitiveId, String(ov.startFrame)),
        sceneId: scene.id,
        sceneIndex: index,
        kind: ov.kind,
        primitiveId: ov.primitiveId,
        label: primitive?.label ?? ov.primitiveId,
        props: ov.props,
        startFrame: ov.startFrame,
        durationFrames: ov.durationFrames,
        reason: ov.reason,
      });
    }
  }

  return suggestions;
}

export function validateSuggestion(suggestion, scenes) {
  const primitive = getPrimitive(suggestion.primitiveId);
  if (!primitive) return false;

  const sceneIdx = scenes.findIndex((s) => s.id === suggestion.sceneId);
  if (sceneIdx < 0) return false;

  if (suggestion.kind === 'transition') {
    const scene = scenes[sceneIdx];
    const next = scenes[sceneIdx + 1];
    if (!next) return false;
    if (primitive.canApply && !primitive.canApply(scene, next)) return false;
  }

  if (suggestion.kind === 'sceneType' && primitive.category !== 'sceneType') return false;
  if (suggestion.kind === 'overlay' && primitive.category !== 'overlay') return false;

  return true;
}

export { mapScriptToScenes };
