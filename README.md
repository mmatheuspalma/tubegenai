# 🐧 TubeGen AI — Frontend / Remotion Code Challenge

> You have **24 hours**. Build something that makes a creator say *"I need this."*

---

## 🚀 What is TubeGen AI?

TubeGen AI is a full-stack AI video creation platform built for YouTube and social media creators. Think of it as a creative co-pilot — going from raw idea to a fully produced, publish-ready video in minutes.

The platform covers the entire creator workflow:

| | Feature | Description |
|---|---|---|
| 📝 | **Scriptwriting** | AI writes viral scripts with hooks, structure, and CTAs |
| 🎙️ | **Voiceover** | Realistic AI voices (ElevenLabs), cloned or stock |
| 🎨 | **Visuals** | AI-generated B-roll, thumbnails, and scene imagery |
| 💬 | **Captions** | Auto-synced animated subtitles |
| 🧑‍🎤 | **Avatars** | Consistent AI characters across all your videos |
| 🎵 | **Music** | Royalty-free AI background tracks |
| 🎬 | **Editor** | In-browser timeline editor to assemble everything |
| 📊 | **Analytics** | Predicted views, CTR, and revenue — before you publish |

Creators go from *"I have an idea"* to a fully produced video — without a camera, mic, or editing software.

---

## 🎯 The Challenge

We want to see how you build a **polished creator-facing video experience** using React + Remotion.

Build a **30–60 second animated video** that showcases a fictional TubeGen AI workflow. The result should feel like a modern AI creator tool: fast, visual, polished, and built for YouTube.

> **You're not building a real app.** You're building a Remotion video that *looks like* a real app being used. Think product demo video, not working software.

---

## 🎬 Suggested Workflow to Animate

The narrative follows a creator going from idea → published video. You can follow this structure or invent your own — as long as the video tells a coherent TubeGen story with at least 3 distinct scenes.

### Scene 1 — 📺 Channel / Idea Input
The user enters a YouTube channel URL or video idea:
```
https://youtube.com/@MrBeast
```
TubeGen analyzes the channel — show a loading state, then reveal: channel name, subscriber count, niche, top performing topics.

### Scene 2 — 💡 Viral Title Generation
TubeGen generates 5 viral video concepts. Show:
- An AI generation / loading state ("Analyzing trends…")
- 5 idea cards appearing with staggered animation
- A viral score or confidence indicator per card
- One idea highlighted as the selected pick

### Scene 3 — 📝 Script Writing
TubeGen writes the full script. Show:
- A script editor or terminal-style panel
- Typewriter animation as the AI writes line by line
- Labeled sections: `[HOOK]`, `[INTRO]`, `[MAIN]`, `[CTA]`
- Word count and estimated watch time on completion

### Scene 4 — 🎙️ Asset Generation
TubeGen produces all production assets in parallel. Show:
- A production pipeline with 4 tracks: Voiceover · Visuals · Captions · Music
- Progress bars filling per track (stagger the timing)
- Live previews: waveform, thumbnail placeholder, subtitle lines, EQ bars
- A final "All assets ready ✓" state

### Scene 5 — ✂️ Video Editor
A timeline-style in-browser editor with the assembled video. Show:
- A video preview area (top) with a caption overlaid
- A timeline (bottom) with clips laid out across tracks: Video · Voice · Music · Captions
- An animated playhead scrubbing across the timeline
- At least one UI panel (e.g. volume, export settings)

### Scene 6 — 🚀 Export & Publish
The video is ready to go. Show:
- "Your video is ready!" success state
- A YouTube-style thumbnail preview with title overlay
- Predicted analytics: estimated views, revenue, best publish time
- An Export / Publish button with a satisfying animation (glow, pulse, confetti)
- TubeGen branding outro

---

## ⚙️ Technical Requirements

**Must use:**
- ⚛️ React
- 🎬 Remotion
- 🔷 TypeScript (preferred, not required)
- Reusable, DRY components
- Consistent design system — spacing, typography, colors, animation style
- At least 3 distinct animated scenes with transitions
- Text, UI panels, and motion effects

**Bonus points for:**
- ⏱️ Timeline-style video editor UI (Scene 5)
- 💬 Animated captions / subtitles
- ⏳ AI generation loading states
- 📊 YouTube-style analytics or monetization elements
- 📐 16:9 (1920×1080) or 9:16 (1080×1920) format
- 🧩 Clean use of `<Sequence>` and `<Series>` for composition timing

---

## 🛠️ Getting Started

```bash
# 1. Clone this repo
git clone https://github.com/amplifyit-io/tubegen-remotion-challenge.git
cd tubegen-remotion-challenge/starter

# 2. Install dependencies
npm install

# 3. Open Remotion Studio — live preview with frame scrubbing
npm start

# 4. Render the final video (outputs to out/tubegen.mp4)
npm run render
```

The `starter/` folder is a fully wired Remotion project. All scene stubs compile and render immediately. Start from `src/Video.tsx` to understand the structure, then build out your scenes.

---

## 📚 Remotion Essentials

If you're new to Remotion, here are the core primitives you'll need:

| Hook / Component | Purpose | Docs |
|---|---|---|
| `useCurrentFrame()` | Current frame number — 0-indexed within a Sequence | [→](https://www.remotion.dev/docs/use-current-frame) |
| `useVideoConfig()` | Returns `fps`, `width`, `height`, `durationInFrames` | [→](https://www.remotion.dev/docs/use-video-config) |
| `interpolate()` | Maps a frame range to a value range (like CSS keyframes) | [→](https://www.remotion.dev/docs/interpolate) |
| `spring()` | Physics-based spring animation — always prefer over linear | [→](https://www.remotion.dev/docs/spring) |
| `<Sequence>` | Renders a component starting at a specific frame offset | [→](https://www.remotion.dev/docs/sequence) |
| `<Series>` | Chains scenes back-to-back automatically | [→](https://www.remotion.dev/docs/series) |
| `<AbsoluteFill>` | Full-bleed absolute-positioned container — root of every scene | [→](https://www.remotion.dev/docs/absolute-fill) |
| `Easing` | Easing curves for `interpolate` (cubic, elastic, bounce…) | [→](https://www.remotion.dev/docs/easing) |

**Patterns you'll use constantly:**

```tsx
import { spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();        // 0 at scene start (inside <Series.Sequence>)
const { fps } = useVideoConfig();

// Slide up + fade in, delayed by 20 frames
const progress = spring({ frame: frame - 20, fps, config: { stiffness: 80, damping: 20 } });
const translateY = interpolate(progress, [0, 1], [40, 0]);
const opacity    = interpolate(frame, [20, 40], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Stagger a list — each item delays by 8 frames
const items = ['A', 'B', 'C'];
items.map((item, i) => {
  const itemProgress = spring({ frame: frame - 30 - i * 8, fps });
  // ...
});

// Looping / organic motion — deterministic, never Math.random()
const waveHeight = Math.abs(Math.sin(frame * 0.12 + index * 0.7)) * 40;
```

**⚠️ Remotion gotchas:**
- **Never use `Math.random()`** — Remotion renders each frame independently, so random values will flicker. Use `Math.sin()` or fixed seeds instead.
- **Never use `setTimeout` or `useEffect` for animation** — everything must be derived from the current frame number.
- **Always clamp `interpolate`** — pass `extrapolateLeft: 'clamp', extrapolateRight: 'clamp'` to avoid out-of-range values.
- **`spring()` returns a number around 0→1** — use `interpolate` on top to map it to CSS values.

**More resources:**
- 📖 [Remotion Docs](https://www.remotion.dev/docs)
- 🎓 [Remotion Crash Course (YouTube)](https://www.youtube.com/watch?v=deg8bOoziaE)
- 💡 [Remotion Showcase / Examples](https://www.remotion.dev/showcase)
- 💬 [Remotion Discord](https://remotion.dev/discord)

---

## 🗂️ Starter Project Structure

```
starter/
├── src/
│   ├── index.ts                  # Remotion entry point — do not modify
│   ├── Root.tsx                  # Registers the composition
│   ├── Video.tsx                 # 🎬 Main composition — scenes wired with <Series>
│   │
│   ├── design/
│   │   └── tokens.ts             # 🎨 Design system — colors, spacing, typography, spring configs
│   │
│   ├── mock/
│   │   └── index.ts              # 📦 All mock data in one place
│   │
│   ├── components/               # 🧩 Build reusable animated primitives here
│   │   └── (you build these)
│   │
│   └── scenes/
│       ├── Scene1Input.tsx       # 📺 Channel / idea input
│       ├── Scene2Ideas.tsx       # 💡 Viral title generation
│       ├── Scene3Script.tsx      # 📝 Script writing
│       ├── Scene4Assets.tsx      # 🎙️ Asset generation pipeline
│       ├── Scene5Editor.tsx      # ✂️ Video editor timeline
│       └── Scene6Export.tsx      # 🚀 Export & publish
│
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

**Suggested reusable components to build** (you don't have to, but they help):

| Component | Purpose |
|---|---|
| `<AnimatedEntry>` | Wrapper for slide-in + fade animations with delay prop |
| `<TypewriterText>` | Renders text character-by-character using `interpolate` |
| `<ProgressBar>` | Animated fill bar driven by `startFrame` / `endFrame` props |
| `<GlassPanel>` | Glassmorphism card — consistent panel styling |
| `<Badge>` | Small colored tag (viral score, status, etc.) |
| `<Background>` | Animated dark background with gradient orbs |

---

## 📦 What to Submit

Reply to this email thread with all three:

1. 🔗 **GitHub repo** — public, with your full implementation
2. 🎥 **Rendered video** — MP4 on Google Drive, YouTube (unlisted), or uploaded to Loom
3. 📹 **Loom walkthrough** (max 5 min) — walk through your code, explain your decisions, show the video playing

> **The Loom is required.** It's how we distinguish candidates who understand Remotion from those who copied code.

### Your README should cover:
- How to run locally and render the video
- Your design and animation approach
- Tradeoffs you made in 24 hours
- What you'd improve with more time

---

## ⏱️ Time Limit

You have **24 hours** from the moment you receive this.

This is intentionally time-boxed. We don't expect perfection — we want to see how you **prioritize, structure, and ship** under real constraints. If you run short on time, implement what you can and document your tradeoffs honestly.

---

## 📊 Evaluation

| Area | Weight |
|---|---|
| 🎬 Remotion Implementation | 25% |
| ⚛️ React Architecture | 20% |
| 🎨 Design Quality | 20% |
| ✨ Animation Quality | 20% |
| 🧩 Reusability / DRY | 10% |
| 📄 README & Docs | 5% |

---

## ❓ Questions?

Reply to the email thread. We respond fast.

Good luck — we're excited to see what you build. 🐧
