import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Input } from "./scenes/Scene1Input";
import { Scene2Ideas } from "./scenes/Scene2Ideas";
import { Scene3Script } from "./scenes/Scene3Script";
import { Scene4SceneBuilder } from "./scenes/Scene4SceneBuilder";
import { Scene5Editor } from "./scenes/Scene5Editor";
import { Scene6Export } from "./scenes/Scene6Export";

export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  // Total: ~50 seconds. Adjust scene durations as you see fit.
  durationInFrames: 1500,
};

// Adjust scene durations to fit your timing.
// Each value is in frames (30 frames = 1 second).
const SCENE_DURATIONS = {
  scene1: 270, // 9s — Channel Input
  scene2: 270, // 9s — Viral Ideas
  scene3: 270, // 9s — Script Generation
  scene4: 240, // 8s — Scene Builder / Assets
  scene5: 270, // 9s — Video Editor
  scene6: 180, // 6s — Export & Publish
};

export const TubeGenVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene1}>
          <Scene1Input />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene2}>
          <Scene2Ideas />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene3}>
          <Scene3Script />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene4}>
          <Scene4SceneBuilder />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene5}>
          <Scene5Editor />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene6}>
          <Scene6Export />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
