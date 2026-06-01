import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SPRING } from "../design/tokens";
import { MOCK_IDEAS, SELECTED_IDEA_ID } from "../mock";

/**
 * SCENE 2 — Viral Title Generation (9s / 270 frames)
 *
 * Narrative: TubeGen generates 5 viral video ideas for the channel.
 *
 * Suggested flow:
 *   0–15f   : Scene fade in
 *   15–60f  : "Generating viral ideas…" loading state (spinner / dots)
 *   60–75f  : Idea card 1 slides in from right (or below)
 *   75–90f  : Idea card 2 slides in
 *   90–105f : Idea card 3 slides in
 *   105–120f: Idea card 4 slides in
 *   120–135f: Idea card 5 slides in
 *   135–210f: Selected card (SELECTED_IDEA_ID) gets highlighted glow + border
 *   210–240f: "Selected ✓" badge animates onto the chosen card
 *   240–270f: Scene fade out
 *
 * Mock data: import MOCK_IDEAS, SELECTED_IDEA_ID from "../mock"
 *
 * Remotion tips:
 *   // Staggered card entry
 *   const STAGGER = 15; // frames between cards
 *   MOCK_IDEAS.map((idea, i) => {
 *     const cardProgress = spring({ frame: frame - 60 - i * STAGGER, fps, config: SPRING.smooth });
 *     const translateX = interpolate(cardProgress, [0, 1], [60, 0]);
 *     const opacity    = interpolate(frame - 60 - i * STAGGER, [0, 20], [0, 1], {
 *       extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
 *     });
 *   });
 *
 *   // Glow on selected card
 *   const isSelected = idea.id === SELECTED_IDEA_ID;
 *   const glowOpacity = interpolate(frame, [135, 165], [0, 1], { ... });
 */
export const Scene2Ideas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TODO: implement Scene 2
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
      Scene 2 — Viral Ideas · frame {frame}
      <br />
      {MOCK_IDEAS.length} ideas generated · best score: {Math.max(...MOCK_IDEAS.map((i) => i.viralScore))}
    </AbsoluteFill>
  );
};
