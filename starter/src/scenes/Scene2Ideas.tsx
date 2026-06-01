import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * SCENE 2 — Viral Ideas (9s / 270 frames)
 *
 * TubeGen generates 5 viral video concepts for the analyzed channel.
 *
 * Required elements:
 *   - "Generating ideas..." AI loading state
 *   - 5 idea cards that appear with staggered animation
 *   - A viral score / confidence indicator on each card
 *   - One idea highlighted as the selected pick
 *
 * Example ideas (or invent your own):
 *   - "I Spent 30 Days Doing Everything MrBeast Did"
 *   - "Every MrBeast Challenge, Ranked by Difficulty"
 *   - "What MrBeast's Team Won't Tell You"
 *   - "I Copied MrBeast's Formula for 1 Week"
 *   - "The MrBeast Effect: Why His Videos Go Viral"
 *
 * Tips:
 *   - Stagger card entries: each card starts spring at delay + i * STAGGER_FRAMES
 *   - Show a glowing border or highlight on the selected card
 */
export const Scene2Ideas: React.FC = () => {
  const frame = useCurrentFrame();

  // TODO: implement Scene 2

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
      Scene 2 — Viral Ideas (frame {frame})
    </AbsoluteFill>
  );
};
