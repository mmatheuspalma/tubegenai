import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * SCENE 3 — Script Generation (9s / 270 frames)
 *
 * TubeGen writes the script for the selected video idea.
 *
 * Required elements:
 *   - A script editor / terminal-style panel
 *   - Typewriter animation as the AI writes the script
 *   - Distinct labeled sections: [HOOK], [INTRO], [MAIN], [CTA]
 *   - Word count and estimated watch time shown on completion
 *
 * Example script content (abbreviated):
 *   [HOOK — 0:00]
 *   "What if I told you MrBeast's success has nothing to do with money..."
 *
 *   [INTRO — 0:10]
 *   "Hey everyone, I've spent the last 3 months studying every single MrBeast
 *    video, and I found a pattern nobody's talking about..."
 *
 *   [MAIN POINT — 0:45]
 *   "The real secret is psychological safety loops. Every 90 seconds, he
 *    resets the tension..."
 *
 *   [CTA — 5:50]
 *   "If this blew your mind, subscribe — I'm dropping the full breakdown
 *    next week..."
 *
 * Tips:
 *   - Reveal script lines progressively using interpolate
 *   - Show a blinking cursor while typing is in progress
 *   - Line numbers and syntax highlighting add a lot of polish
 */
export const Scene3Script: React.FC = () => {
  const frame = useCurrentFrame();

  // TODO: implement Scene 3

  return (
    <AbsoluteFill
      style={{
        background: "#0A0A12",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 32,
        fontFamily: "sans-serif",
      }}
    >
      Scene 3 — Script Generation (frame {frame})
    </AbsoluteFill>
  );
};
