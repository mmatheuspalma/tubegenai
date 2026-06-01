import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SPRING } from "../design/tokens";
import { MOCK_ANALYTICS, MOCK_IDEAS, SELECTED_IDEA_ID } from "../mock";

/**
 * SCENE 6 — Export & Publish (6s / 180 frames)
 *
 * Narrative: the video is ready — celebrate it and show the creator what to expect.
 *
 * Suggested flow:
 *   0–15f  : Scene fade in
 *   15–45f : "Your video is ready! 🎉" headline springs in
 *   45–75f : YouTube-style thumbnail preview appears
 *   75–105f: Analytics panel slides in (views, revenue, publish time)
 *   75–120f: View count animates from 0 → predicted value (counting up)
 *   75–120f: Revenue animates from $0 → predicted value
 *   120–150f: Export / Publish button pulses with glow
 *   150–170f: TubeGen logo + tagline outro
 *   170–180f: Scene fade out
 *
 * Mock data: import MOCK_ANALYTICS, MOCK_IDEAS, SELECTED_IDEA_ID from "../mock"
 *
 * Remotion tips:
 *   // Counting-up number animation
 *   const views = Math.floor(
 *     interpolate(frame, [75, 120], [0, MOCK_ANALYTICS.predictedViews48h], {
 *       extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
 *       easing: Easing.out(Easing.cubic),
 *     })
 *   );
 *
 *   // Pulsing glow on the export button
 *   const glow = 0.6 + 0.4 * Math.sin((frame * Math.PI * 2) / 30); // 1Hz pulse
 *   const boxShadow = `0 0 ${30 * glow}px rgba(124,58,237,${0.7 * glow})`;
 *
 *   // Confetti / particles — use deterministic positions with Math.sin
 *   Array.from({ length: 20 }, (_, i) => ({
 *     x: Math.sin(i * 1.7) * 400 + 960,
 *     y: interpolate(frame - 15, [0, 60], [540, 540 - 200 - i * 10]),
 *     opacity: interpolate(frame, [15, 45, 80], [0, 1, 0]),
 *   }));
 */
export const Scene6Export: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const selectedIdea = MOCK_IDEAS.find((i) => i.id === SELECTED_IDEA_ID);

  // TODO: implement Scene 6
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
      Scene 6 — Export & Publish · frame {frame}
      <br />
      {selectedIdea?.title}
      <br />
      Predicted: {MOCK_ANALYTICS.predictedViews48h.toLocaleString()} views
    </AbsoluteFill>
  );
};
