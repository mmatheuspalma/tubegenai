# Writeup

## Primitives I added

**Transitions — pacing and scene-type coverage.** The starter only ships crossfade, gated to image→image boundaries. That leaves broll and animation cuts hard-edged. I added **Fade to Black** for section breaks (works on any boundary), **Slide Left** with spring easing for broll handoffs, and **Zoom Blur** as a hero transition into the finale animation. Product reasoning: creators need transitions that match content type, not one dissolve for everything.

**Effects — cinematic polish without re-cutting.** **Ken Burns** combines pan + zoom in one configurable primitive (cleaner than stacking pan + zoom). **Vignette** adds depth on talking-head stills. **Color Grade** offers warm/cool/cinematic/night presets so mood shifts track the narration (night theme for a “dogs bark at night” piece).

**Overlays — information hierarchy.** **Title Card** opens with a branded hook. **Captions** syncs narration from `script.txt` across the full voiceover (phrase-level timing, editable segment list). **Keyword Callout** and the starter **Lower Third** add emphasis without covering the whole frame.

**Scene type — proving the seam.** **Fact Card** is a data-driven full-frame card (headline + body + accent). It shows the `sceneType` category works the same as overlays but reads as generated content, not a positioned sticker.

## How a primitive plugs in

Each primitive is one file under `src/editor/extension/<category>/` exporting `{ id, label, category, defaultProps, RemotionComponent, PropertiesEditor, canApply? }`. Register it in `primitives.js`. The AssetsSidebar lists it by category; applying effects/transitions dispatches `APPLY_EFFECT` / `SET_TRANSITION` onto timeline items, while overlays dispatch `ADD_ITEM` on track `o1`. PropertiesPanel looks up the primitive by id and renders its editor. At render time, `MainComposition` reads the same registry — effects wrap media in `VideoItem`, transitions bridge outgoing scenes, overlays/sceneTypes render in their own `Sequence`. No hardcoded demo logic inside primitives.

I also wired an **Overlays** tab, timeline badges for applied effects, and an **Export for render** flow (`npm run render -- --save scenes.json`) so editor state reaches the headless renderer.

## What I'd ship next with another 24 hours

- Background music on track `a2` with auto-ducking under voiceover
- `premountFor` on video transitions to eliminate seek flashes
- Keyboard shortcuts for scrubbing and overlay placement

## Hours & cuts

- **Hours spent:** ~18
- **What I cut for time:** background music, automated tests, server-side render API

## Demos

- **[Final rendered cut](https://drive.google.com/file/d/1O1ac4vaimRYZo_271UrPKJxI5O9KZ2yU/view?usp=drive_link)**
- **[Video editor walkthrough](https://drive.google.com/file/d/1zqoLQUnj-tWkKncwM8qMrhD9I2XwiC-7/view?usp=sharing)**

## Bonus — Smart Enhance

Content-aware suggestions and script-synced captions. See [`src/editor/extension/SMART_ENHANCE.md`](./src/editor/extension/SMART_ENHANCE.md).
