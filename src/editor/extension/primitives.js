// Primitive registry. Add new primitives here.
// See ./README.md for the contract every primitive must implement.

import crossfade from './transitions/crossfade.jsx';
import fadeToBlack from './transitions/fadeToBlack.jsx';
import slideLeft from './transitions/slideLeft.jsx';
import zoomBlur from './transitions/zoomBlur.jsx';
import zoomIn from './effects/zoomIn.jsx';
import zoomOut from './effects/zoomOut.jsx';
import panLeft from './effects/panLeft.jsx';
import panRight from './effects/panRight.jsx';
import kenBurns from './effects/kenBurns.jsx';
import vignette from './effects/vignette.jsx';
import colorGrade from './effects/colorGrade.jsx';
import lowerThird from './overlays/lowerThird.jsx';
import titleCard from './overlays/titleCard.jsx';
import keywordCallout from './overlays/keywordCallout.jsx';
import captions from './overlays/captions.jsx';
import factCard from './sceneTypes/factCard.jsx';

export const PRIMITIVES = [
  crossfade,
  fadeToBlack,
  slideLeft,
  zoomBlur,
  zoomIn,
  zoomOut,
  panLeft,
  panRight,
  kenBurns,
  vignette,
  colorGrade,
  lowerThird,
  titleCard,
  keywordCallout,
  captions,
  factCard,
];

const byId = new Map(PRIMITIVES.map((p) => [p.id, p]));
const byCategory = PRIMITIVES.reduce((acc, p) => {
  (acc[p.category] ??= []).push(p);
  return acc;
}, {});

export const getPrimitive = (id) => byId.get(id);
export const getPrimitivesByCategory = (category) => byCategory[category] ?? [];

export const CATEGORIES = ['transition', 'effect', 'overlay', 'sceneType'];
