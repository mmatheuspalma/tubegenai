import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Input } from "./scenes/Scene1Input";
import { Scene2Ideas } from "./scenes/Scene2Ideas";
import { Scene3Script } from "./scenes/Scene3Script";
import { Scene4Assets } from "./scenes/Scene4Assets";
import { Scene5Editor } from "./scenes/Scene5Editor";
import { Scene6Export } from "./scenes/Scene6Export";

// ---------------------------------------------------------------------------
// Video config — exported so Root.tsx can use the same values
// ---------------------------------------------------------------------------

export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  // Keep durationInFrames in sync with the sum of SCENE_DURATIONS below.
  // 30 frames = 1 second
  durationInFrames: 1500,
};

// ---------------------------------------------------------------------------
// Scene durations (in frames)
// Adjust freely — the <Series> below will sequence them automatically.
// ---------------------------------------------------------------------------

const S = {
  scene1: 270, //  9s — Channel / Idea Input
  scene2: 270, //  9s — Viral Title Generation
  scene3: 270, //  9s — Script Writing
  scene4: 240, //  8s — Asset Generation
  scene5: 270, //  9s — Video Editor
  scene6: 180, //  6s — Export & Publish
  // Total:  1500 frames = 50s
};

// ---------------------------------------------------------------------------
// How Remotion sequences work:
//
// <Series> chains scenes end-to-end. Inside each <Series.Sequence>,
// useCurrentFrame() resets to 0 — so each scene is self-contained.
//
// If you want scenes to overlap (cross-dissolve), use <Sequence> directly
// with matching `from` offsets and handle opacity fades manually.
//
// Prefer <Series> for clean cuts and <Sequence> for overlapping transitions.
// ---------------------------------------------------------------------------

export const TubeGenVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        <Series.Sequence durationInFrames={S.scene1}>
          <Scene1Input />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.scene2}>
          <Scene2Ideas />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.scene3}>
          <Scene3Script />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.scene4}>
          <Scene4Assets />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.scene5}>
          <Scene5Editor />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.scene6}>
          <Scene6Export />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
