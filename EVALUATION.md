# Evaluation Rubric — TubeGen AI Challenge

> Internal document. Not shared with candidates.

---

## Scoring (100 points total)

### React Architecture — 20 pts

| Score | Criteria |
|---|---|
| 18–20 | Clean component hierarchy, reusable primitives, no prop drilling, proper use of hooks |
| 13–17 | Mostly clean, minor duplication or awkward structure |
| 8–12 | Components exist but are tangled, repetitive, or hard to follow |
| 0–7 | Monolithic files, no meaningful component decomposition |

**Look for:**
- Shared design tokens / constants (colors, spacing, font sizes)
- Reusable animated primitives (AnimatedEntry, TypewriterText, ProgressBar, etc.)
- Scene components that are self-contained
- No hardcoded magic numbers scattered across files

---

### Remotion Knowledge — 25 pts

| Score | Criteria |
|---|---|
| 22–25 | Correct use of `useCurrentFrame`, `spring`, `interpolate`, `<Series>` or `<Sequence>`, `AbsoluteFill`. Timing feels intentional |
| 15–21 | Core APIs used correctly but timing is off, or misses a major primitive (e.g., uses linear timing everywhere instead of spring) |
| 8–14 | Basic usage, some misuse (e.g., using state/effects for animation instead of frame math) |
| 0–7 | Fundamentally wrong approach (e.g., CSS animations, setTimeout, useEffect for motion) |

**Red flags:**
- Using `useState` or `useEffect` for animation timing
- Not using `spring` anywhere (everything linear/janky)
- Frame math that produces NaN or undefined at boundary conditions
- Ignoring `extrapolateLeft: 'clamp'` on interpolations

---

### Design Quality — 20 pts

| Score | Criteria |
|---|---|
| 18–20 | Feels like a real product. Consistent dark theme, readable typography, intentional use of color, depth via shadows/blur |
| 13–17 | Looks designed but inconsistencies in spacing, color, or type scale |
| 8–12 | Functional but plainly styled — no clear design system |
| 0–7 | Difficult to read, inconsistent, or visually noisy |

**Look for:**
- Consistent color palette (brand colors used purposefully, not randomly)
- Typography hierarchy (headings vs. labels vs. body vs. muted text)
- Glassmorphism or depth effects used tastefully
- UI elements that look like they belong in the same product

---

### Animation Quality — 20 pts

| Score | Criteria |
|---|---|
| 18–20 | Animations feel natural and intentional. Spring physics used. Stagger on list items. No jarring cuts between scenes |
| 13–17 | Some good motion but mixed quality — some smooth, some janky or linear |
| 8–12 | Animations exist but feel generic or unfinished |
| 0–7 | Static or nearly static — minimal actual animation |

**Look for:**
- Spring-based motion (not just `interpolate` everywhere)
- Staggered entries for list items
- Fade + translate combos (not just opacity-only fades)
- Scene transitions (fade to black, cross-dissolve, etc.)
- Continuous animations (waveform, EQ bars, pulsing glows, particles)
- Timing that gives the viewer time to read — not too fast

---

### Reusability / DRY — 10 pts

| Score | Criteria |
|---|---|
| 9–10 | Clearly reusable components. Same primitives used across multiple scenes. Design tokens used consistently |
| 6–8 | Some reuse, but also obvious copy-paste patterns |
| 3–5 | Little reuse — mostly duplicated code across scenes |
| 0–2 | No shared components or constants at all |

---

### README & Documentation — 5 pts

| Score | Criteria |
|---|---|
| 5 | Clear setup instructions, explains approach, honest about tradeoffs |
| 3–4 | Covers setup but thin on explanation |
| 1–2 | Minimal or generic |
| 0 | Missing or copy of the original challenge README |

---

## Loom Review Checklist

Use this during the Loom review to assess depth:

- [ ] Can they explain *why* they chose a specific Remotion pattern?
- [ ] Do they understand the difference between `spring` and `interpolate`?
- [ ] Can they talk through their component architecture without looking at their code?
- [ ] Do they mention tradeoffs or things they'd do differently?
- [ ] Does the video actually play correctly in the Loom?

---

## Hire / No-Hire Signal

**Strong hire:** 75+ pts, confident Loom, clearly understands Remotion frame math and React architecture.

**Consider hire:** 55–74 pts, solid fundamentals with minor gaps. Can grow.

**No hire:** Below 55 pts, or Loom reveals they didn't write/understand their own code.
