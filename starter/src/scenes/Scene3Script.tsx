import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SPRING } from "../design/tokens";
import { MOCK_SCRIPT } from "../mock";

/**
 * SCENE 3 — Script Writing (9s / 270 frames)
 *
 * Narrative: TubeGen AI writes the full script section by section.
 *
 * Suggested flow:
 *   0–15f   : Scene fade in
 *   15–40f  : Script editor panel slides in
 *   40–80f  : HOOK section types out
 *   80–130f : INTRO section types out
 *   130–200f: MAIN section types out
 *   200–240f: CTA section types out
 *   240–260f: Word count + "Script complete ✓" badge appears
 *   260–270f: Scene fade out
 *
 * Mock data: import MOCK_SCRIPT from "../mock"
 *
 * Remotion tips:
 *   // Typewriter for a text block
 *   const text = "What if I told you...";
 *   const chars = Math.floor(
 *     interpolate(frame, [startFrame, endFrame], [0, text.length], {
 *       extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
 *     })
 *   );
 *   const visible = text.slice(0, chars);
 *
 *   // Blinking cursor (blinks every 12 frames = ~2.5Hz)
 *   const cursorVisible = Math.floor(frame / 12) % 2 === 0;
 *
 *   // Reveal sections one by one — show section N only after section N-1 is done
 *   const section1Done = chars >= section1Text.length;
 */
export const Scene3Script: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TODO: implement Scene 3
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
      Scene 3 — Script Writing · frame {frame}
      <br />
      {MOCK_SCRIPT.wordCount} words · {MOCK_SCRIPT.estimatedRuntime}
    </AbsoluteFill>
  );
};
