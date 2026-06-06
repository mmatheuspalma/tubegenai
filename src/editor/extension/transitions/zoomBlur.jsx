import { AbsoluteFill, Freeze, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const ZoomBlurRender = ({ props, ctx, renderItem }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationFrames, nextItem } = ctx;
  const { durationFrames: configured = 22, maxScale = 1.12, maxBlur = 8 } = props;
  const dur = Math.min(configured, durationFrames);

  const progress = spring({
    frame,
    fps,
    config: { damping: 180, stiffness: 100 },
    durationInFrames: dur,
  });
  const scale = interpolate(progress, [0, 1], [maxScale, 1]);
  const blur = interpolate(progress, [0, 1], [maxBlur, 0]);
  const opacity = interpolate(progress, [0, 0.15, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale})`,
        filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
      }}
    >
      <Freeze frame={0}>{renderItem(nextItem)}</Freeze>
    </AbsoluteFill>
  );
};

const ZoomBlurProps = ({ props, onChange }) => {
  const setN = (k) => (e) => onChange({ ...props, [k]: parseFloat(e.target.value) || 0 });
  return (
    <div className="props-form">
      <label>
        Duration (frames)
        <input
          type="number"
          step="1"
          min="6"
          max="45"
          value={props.durationFrames}
          onChange={(e) =>
            onChange({ ...props, durationFrames: parseInt(e.target.value, 10) || 6 })
          }
        />
      </label>
      <label>
        Max scale
        <input type="number" step="0.02" min="1" max="1.5" value={props.maxScale} onChange={setN('maxScale')} />
      </label>
      <label>
        Max blur (px)
        <input type="number" step="1" min="0" max="20" value={props.maxBlur} onChange={setN('maxBlur')} />
      </label>
    </div>
  );
};

export default {
  id: 'zoomBlur',
  label: 'Zoom Blur',
  category: 'transition',
  defaultProps: { durationFrames: 22, maxScale: 1.12, maxBlur: 8 },
  RemotionComponent: ZoomBlurRender,
  PropertiesEditor: ZoomBlurProps,
};
