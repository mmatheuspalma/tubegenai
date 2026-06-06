import { AbsoluteFill, Freeze, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const SlideLeftRender = ({ props, ctx, renderItem }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationFrames, nextItem } = ctx;
  const { durationFrames: configured = 18 } = props;
  const dur = Math.min(configured, durationFrames);

  const progress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 120 },
    durationInFrames: dur,
  });
  const translateX = interpolate(progress, [0, 1], [100, 0]);

  return (
    <AbsoluteFill style={{ transform: `translateX(${translateX}%)` }}>
      <Freeze frame={0}>{renderItem(nextItem)}</Freeze>
    </AbsoluteFill>
  );
};

const SlideLeftProps = ({ props, onChange }) => (
  <div className="props-form">
    <label>
      Duration (frames @ 30fps)
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
  </div>
);

export default {
  id: 'slideLeft',
  label: 'Slide Left',
  category: 'transition',
  defaultProps: { durationFrames: 18 },
  RemotionComponent: SlideLeftRender,
  PropertiesEditor: SlideLeftProps,
};
