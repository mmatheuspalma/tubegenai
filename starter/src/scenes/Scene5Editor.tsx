import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * SCENE 5 — Video Editor (9s / 270 frames)
 *
 * Show a timeline-style in-browser video editor with the assembled video.
 *
 * Required elements:
 *   - A video preview area (top half) showing the thumbnail or a mock frame
 *   - A timeline (bottom half) with scene clips laid out as blocks
 *   - A playhead / scrubber that moves across the timeline
 *   - At least one caption/subtitle overlaid on the preview
 *   - At least one animated UI panel (e.g., volume, effects, export settings)
 *
 * Suggested timeline tracks:
 *   ─────────────────────────────────────────────────────
 *   VIDEO    [Scene 1]  [Scene 2]  [Scene 3]  [Scene 4]
 *   VOICE    [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]
 *   MUSIC    [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]
 *   CAPTIONS [cap 1]  [cap 2]  [cap 3]  [cap 4]
 *   ─────────────────────────────────────────────────────
 *
 * Tips:
 *   - Animate the playhead X position using interpolate over the scene duration
 *   - Captions should animate in/out as the playhead passes them
 *   - A scrubbing effect (highlight on the active clip) adds realism
 */
export const Scene5Editor: React.FC = () => {
  const frame = useCurrentFrame();

  // TODO: implement Scene 5

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
      Scene 5 — Video Editor (frame {frame})
    </AbsoluteFill>
  );
};
