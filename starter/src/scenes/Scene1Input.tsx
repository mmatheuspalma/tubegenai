import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SPRING } from "../design/tokens";
import { MOCK_CHANNEL } from "../mock";

/**
 * SCENE 1 — Channel / Idea Input (9s / 270 frames)
 *
 * Narrative: the user pastes a YouTube channel URL and TubeGen analyzes it.
 *
 * Suggested flow:
 *   0–15f   : Scene fade in
 *   15–30f  : TubeGen logo / header slides in
 *   30–45f  : Input panel springs up from below
 *   45–130f : URL types into the input field character by character
 *   130–160f: "Analyze" button lights up, user "clicks" it
 *   160–190f: Loading state — spinner or animated dots
 *   190–240f: Channel data panel reveals (name, subs, niche, top topics)
 *   240–270f: Scene fade out
 *
 * Mock data: import MOCK_CHANNEL from "../mock"
 *
 * Remotion tips:
 *   // Typewriter — map frame range to char count
 *   const chars = Math.floor(interpolate(frame, [45, 130], [0, url.length], {
 *     extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
 *   }));
 *
 *   // Spring entry — panel slides up
 *   const progress = spring({ frame: frame - 30, fps, config: SPRING.smooth });
 *   const translateY = interpolate(progress, [0, 1], [40, 0]);
 *
 *   // Fade in/out for smooth scene transitions
 *   const opacity = interpolate(frame, [0, 15, 255, 270], [0, 1, 1, 0], {
 *     extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
 *   });
 */
export const Scene1Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // TODO: implement Scene 1
  // Remove the placeholder below and build your scene.
  // Use MOCK_CHANNEL for data and SPRING / C / FONT for styling.
  void fps; // remove when you use it

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
      Scene 1 — Channel Input · frame {frame}
      <br />
      Channel: {MOCK_CHANNEL.name} · {MOCK_CHANNEL.subscribers} subs
    </AbsoluteFill>
  );
};
