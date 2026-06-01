# TubeGen AI — Frontend / Remotion Take-Home Challenge

## Overview

TubeGen AI helps creators generate viral YouTube and social media videos using AI-powered workflows: scriptwriting, voiceover, visuals, thumbnails, consistent characters, music, and an in-browser video editor.

**Your task:** Build a polished 45–60 second animated video using Remotion that showcases the TubeGen AI workflow end-to-end.

---

## Required Scenes

You must implement **all 6 scenes** in sequence. The narrative follows a creator going from idea → published video.

### Scene 1 — Channel Input
The user pastes a YouTube channel URL:
```
https://youtube.com/@MrBeast
```
TubeGen fetches and displays channel data (subscribers, niche, top topics). Show a loading/analysis state, then a results panel.

### Scene 2 — Viral Ideas
TubeGen generates 5 viral video concepts for the channel. Show:
- AI generation loading state
- Animated cards appearing for each idea
- A "viral score" or confidence indicator per card
- One idea getting selected/highlighted

### Scene 3 — Script Generation
TubeGen writes the script for the selected idea. Show:
- A script editor / terminal-style panel
- Typewriter effect as the AI writes the script
- Distinct sections: Hook, Intro, Main Points, CTA
- Word count and estimated read time

### Scene 4 — Scene Builder
TubeGen generates assets for each scene. Show:
- A production pipeline with multiple tracks: Voiceover, Visuals, Captions, Music
- Progress indicators per track
- Loading → complete states
- Asset previews (waveform, thumbnail placeholder, caption lines, EQ bars)

### Scene 5 — Video Editor
Show a timeline-style editor UI with the assembled video. Must include:
- A timeline with scene clips laid out
- Caption/subtitle overlay
- Playhead or progress indicator
- At least one animated UI panel (volume, effects, etc.)

### Scene 6 — Export & Publish
The video is ready. Show:
- "Your video is ready" state
- A YouTube-style thumbnail preview
- Predicted analytics (views, revenue estimate)
- Export / Publish button with a satisfying animation
- TubeGen branding outro

---

## Technical Requirements

| Requirement | Detail |
|---|---|
| Framework | React + Remotion |
| Language | TypeScript (required) |
| Duration | 45–60 seconds |
| Format | 1920×1080 (16:9) or 1080×1920 (9:16) |
| FPS | 30 |
| Scenes | All 6 above |
| Components | Reusable, DRY |
| Design | Consistent spacing, typography, colors, animation style |
| Data | Mock data is fine and encouraged |

---

## Getting Started

```bash
# Clone the repo
git clone <this-repo>
cd tubegen-remotion-challenge

# Install dependencies
cd starter
npm install

# Open Remotion Studio (live preview)
npm start

# Render the final video
npm run render
```

The `starter/` directory contains a working Remotion scaffold. All 6 scene stubs are wired into the main composition. You implement the scenes — the composition timing and structure are yours to adjust.

---

## Deliverables

Submit all three of the following by **replying to this email thread**:

1. **GitHub repository link** — public repo with your implementation
2. **Rendered MP4** — uploaded to Google Drive, YouTube (unlisted), or Loom
3. **Loom walkthrough** (max 5 min) — walk through your code, explain your approach, show the video playing

> The Loom is required. It helps us understand your thinking, not just the output.

---

## Notes

- Mock data is encouraged — no real APIs needed
- You have **24 hours** from when you receive this
- We care more about quality and product sense than completeness
- If you run out of time, ship what you have and explain tradeoffs in your README

---

## Questions?

Reply to the email thread. We respond fast.
