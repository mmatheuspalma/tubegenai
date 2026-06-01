import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * SCENE 1 — Channel Input (9s / 270 frames)
 *
 * Show the user pasting a YouTube channel URL:
 *   https://youtube.com/@MrBeast
 *
 * Required elements:
 *   - TubeGen AI branding / logo
 *   - A URL input field with a typewriter animation
 *   - A loading / "analyzing channel" state
 *   - Channel data revealed: name, subscribers, niche, top topics
 *
 * Tips:
 *   - Use `spring` from 'remotion' for natural entry animations
 *   - Use `interpolate` for typewriter progress (map frame range → char count)
 *   - Inside a <Series.Sequence>, useCurrentFrame() starts at 0
 */
export const Scene1Input: React.FC = () => {
  const frame = useCurrentFrame();

  // TODO: implement Scene 1

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
      Scene 1 — Channel Input (frame {frame})
    </AbsoluteFill>
  );
};
