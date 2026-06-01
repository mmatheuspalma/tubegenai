import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SPRING } from "../design/tokens";
import { MOCK_TIMELINE_CLIPS, MOCK_CAPTIONS } from "../mock";

/**
 * SCENE 5 — Video Editor (9s / 270 frames)
 *
 * Narrative: a timeline-style in-browser editor with the assembled video.
 *
 * Suggested layout:
 *   ┌────────────────────────────────────────────────────────┐
 *   │  VIDEO PREVIEW (top 60%)          │  Tools panel      │
 *   │  [thumbnail + caption overlay]    │  Volume / Effects │
 *   ├────────────────────────────────────────────────────────┤
 *   │  TIMELINE (bottom 40%)                                 │
 *   │  VIDEO    [Hook] [Intro] [Day 1] [Day 15] [CTA]       │
 *   │  VOICE    [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]         │
 *   │  MUSIC    [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]         │
 *   │  CAPTIONS [cap 1]  [cap 2]  [cap 3]                   │
 *   │           ↑ playhead scrubs left→right                 │
 *   └────────────────────────────────────────────────────────┘
 *
 * Suggested flow:
 *   0–20f  : Scene fade in
 *   20–50f : Editor layout slides in (preview + timeline panels)
 *   50–70f : Timeline clips appear (staggered)
 *   70–230f: Playhead scrubs across timeline — animate X with interpolate
 *   90f+   : Active caption changes as playhead crosses each clip
 *   230–270f: Scene fade out
 *
 * Mock data: import MOCK_TIMELINE_CLIPS, MOCK_CAPTIONS from "../mock"
 *
 * Remotion tips:
 *   // Playhead position — move left to right over the scene
 *   const TIMELINE_WIDTH = 900;
 *   const playheadX = interpolate(frame, [70, 230], [0, TIMELINE_WIDTH], {
 *     extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
 *   });
 *
 *   // Active caption — find which clip the playhead is currently over
 *   const activeCaption = MOCK_CAPTIONS.find(
 *     (c) => playheadX >= c.start && playheadX < c.start + 60
 *   );
 */
export const Scene5Editor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TODO: implement Scene 5
  void fps;

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.textPrimary,
        fontSize: 28,
        fontFamily: FONT.family,
      }}
    >
      Scene 5 — Video Editor · frame {frame}
      <br />
      {MOCK_TIMELINE_CLIPS.length} clips · {MOCK_CAPTIONS.length} captions
    </AbsoluteFill>
  );
};
