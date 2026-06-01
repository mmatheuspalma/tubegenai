import React from "react";
import { Composition } from "remotion";
import { TubeGenVideo, VIDEO_CONFIG } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TubeGenVideo"
      component={TubeGenVideo}
      fps={VIDEO_CONFIG.fps}
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};
