# Smart Enhance

Smart Enhance is a **content-aware editing assistant** in the editor sidebar. It reads the voiceover script and scene metadata, then proposes effects, transitions, and overlays for your review — nothing applies until you confirm.

It is built on top of the [primitive registry](./README.md): every suggestion resolves to a registered primitive and uses the same reducer actions as manual editing (`APPLY_EFFECT`, `SET_TRANSITION`, `ADD_ITEM`).

---

## Where to find it

1. Run `npm run dev` and open the editor.
2. Select the **Smart** tab in the left sidebar.
3. Use **Open Smart Enhance** for effect/transition/overlay suggestions, or **Generate captions** for synced subtitles from `script.txt`.

---

## Smart Enhance (effects & transitions)

1. Click **Open Smart Enhance**.
2. *(Optional)* Paste an **OpenAI API key** in the field (stored in `sessionStorage` for the session only).
   - Or set `VITE_OPENAI_API_KEY` in `.env.local` for convenience.
3. Click **Analyze with AI** (if a key is provided) or **Suggest (offline)** (no key).
4. Review the checklist — each row shows scene, kind, primitive, and a short reason.
5. Uncheck anything you do not want, then **Apply N suggestions**.

### AI mode vs offline mode

| | **AI mode** | **Offline mode** |
|---|---|---|
| **Requires** | OpenAI API key | Nothing |
| **How it works** | Sends script + scene list + primitive catalog to `gpt-4o-mini`; returns JSON suggestions | Keyword + scene-type heuristics (e.g. "night" → color grade, broll → pan) |
| **Fallback** | If AI fails, offline suggestions load automatically | — |

---

## Generate captions

Builds a **Captions** overlay from `public/demo/assets/script.txt`, with phrase-level timing mapped to scene durations.

1. Smart tab → **Generate captions**
2. Replaces any existing Captions overlay on track `o1`
3. Tune segments, font, and position in the Properties panel after apply

Captions are derived from the script text (not speech-to-text), timed proportionally across the voiceover.

---

## Export and render

After editing:

1. **Export for render** (top bar) — downloads `scenes.json`
2. Render with your exported state:

```bash
npm run render -- --save ~/Downloads/scenes.json
```

Or commit `public/demo/scenes.json` and run `npm run render`.

---

## Optional: OpenAI API key

Create `.env.local` at the repo root:

```
VITE_OPENAI_API_KEY=sk-your-key-here
```

Restart `npm run dev`. The key field in Smart Enhance pre-fills from this variable.

---

## Architecture

Smart Enhance does **not** bypass the primitive registry:

```
script.txt + scenes.json
        ↓
src/editor/suggester/     ← heuristics.js or ai.js
        ↓
SmartSuggestPanel.jsx     ← review checklist
        ↓
applySuggestion()         ← APPLY_EFFECT / SET_TRANSITION / ADD_ITEM
        ↓
Same timeline state as manual editing → npm run render
```

| File | Role |
|---|---|
| [`../SmartSuggestPanel.jsx`](../SmartSuggestPanel.jsx) | Review & apply UI |
| [`../suggester/index.js`](../suggester/index.js) | Loads script, routes AI vs heuristics |
| [`../suggester/heuristics.js`](../suggester/heuristics.js) | Offline rules |
| [`../suggester/ai.js`](../suggester/ai.js) | OpenAI integration |
| [`../suggester/captions.js`](../suggester/captions.js) | Caption phrase builder |
| [`../suggester/applyCaptions.js`](../suggester/applyCaptions.js) | Captions overlay apply |
| [`../suggester/mapScriptToScenes.js`](../suggester/mapScriptToScenes.js) | Maps script beats to scene windows |
| [`./primitives.js`](./primitives.js) | Catalog sent to AI; suggestions must match registered ids |

---

## Tips

- **Start with captions**, then Smart Enhance — avoids overlapping text overlays.
- **Use offline mode first** to see baseline suggestions, then compare with AI mode.
- Suggestions are a starting point; tune props in the Properties panel before export.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Smart tab empty / no scenes | Wait for `scenes.json` to load; check browser console |
| AI returns an error | Verify API key; use **Offline only** or **Suggest (offline)** |
| Captions out of sync | Re-export after changing scene durations; regenerate captions |
| Suggestion not in list | Primitive may be missing from `primitives.js` or filtered by `canApply` |
