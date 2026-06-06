import { buildCaptionsFromScript } from './captions.js';
import { loadScript } from './index.js';
import { TRACK_TYPES, ITEM_TYPES } from '../types.js';

export async function generateCaptionOverlay(scenes, totalFrames) {
  const scriptText = await loadScript();
  const segments = buildCaptionsFromScript(scenes, scriptText, totalFrames);
  return {
    type: ITEM_TYPES.OVERLAY,
    trackId: TRACK_TYPES.O1,
    startFrame: 0,
    durationFrames: totalFrames,
    primitiveId: 'captions',
    primitiveProps: {
      segments,
      fontSize: 30,
      fontFamily: 'Inter, system-ui, sans-serif',
      textColor: '#FFFFFF',
      backgroundColor: 'rgba(0,0,0,0.72)',
      bottom: 72,
      maxWidth: '82%',
      fadeFrames: 5,
    },
  };
}

export function findCaptionItemId(items) {
  return items.find((i) => i.primitiveId === 'captions')?.id ?? null;
}

/** Replace existing captions overlay or add a new one. */
export function applyCaptions(dispatch, items, totalFrames, scenes) {
  return generateCaptionOverlay(scenes, totalFrames).then((item) => {
    const existingId = findCaptionItemId(items);
    if (existingId) {
      dispatch({ type: 'REMOVE_ITEM', id: existingId });
    }
    dispatch({ type: 'ADD_ITEM', item });
    return item.primitiveProps.segments.length;
  });
}
