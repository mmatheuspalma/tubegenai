import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SPRING } from "../design/tokens";
import { MOCK_ASSETS } from "../mock";

/**
 * SCENE 4 — Asset Generation Pipeline (8s / 240 frames)
 *
 * Narrative: TubeGen generates all video assets in parallel.
 *
 * Suggested flow:
 *   0–15f  : Scene fade in
 *   15–30f : "Generating assets…" header appears
 *   30–50f : Voiceover card slides in + progress starts filling
 *   50–70f : Visuals card slides in
 *   70–90f : Captions card slides in
 *   90–110f: Music card slides in
 *   30–190f: Progress bars fill to 100% (staggered start, staggered end)
 *   190f+  : Each card shows ✓ complete state as its bar reaches 100%
 *   200–225f: "All assets ready ✓" banner springs in
 *   225–240f: Scene fade out
 *
 * Mock data: import MOCK_ASSETS from "../mock"
 *
 * Remotion tips:
 *   // Staggered progress bars (each starts 15f after the previous)
 *   MOCK_ASSETS.map((asset, i) => {
 *     const startFrame = 30 + i * 15;
 *     const endFrame = startFrame + 130;
 *     const pct = interpolate(frame, [startFrame, endFrame], [0, 100], {
 *       extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
 *     });
 *     const isComplete = pct >= 100;
 *   });
 *
 *   // Waveform bars — deterministic organic motion
 *   Array.from({ length: 20 }, (_, i) => {
 *     const height = Math.abs(Math.sin(frame * 0.12 + i * 0.7)) * 40 + 8;
 *   });
 *
 *   // EQ bars
 *   Array.from({ length: 12 }, (_, i) => {
 *     const height = Math.abs(Math.sin(frame * 0.15 + i * 0.9)) * 50 + 10;
 *   });
 */
export const Scene4Assets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TODO: implement Scene 4
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
      Scene 4 — Asset Generation · frame {frame}
      <br />
      {MOCK_ASSETS.map((a) => a.icon + " " + a.label).join("  ·  ")}
    </AbsoluteFill>
  );
};
