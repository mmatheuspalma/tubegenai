import { AbsoluteFill, Freeze, useCurrentFrame, interpolate } from 'remotion';

const FadeToBlackRender = ({ props, ctx, renderItem }) => {
  const frame = useCurrentFrame();
  const { durationFrames, nextItem } = ctx;
  const { durationFrames: configured = 20 } = props;
  const dur = Math.min(configured, durationFrames);
  const mid = Math.floor(dur / 2);

  const blackOpacity = interpolate(frame, [0, mid, dur], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nextOpacity = interpolate(frame, [mid, dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: '#000', opacity: blackOpacity }} />
      <AbsoluteFill style={{ opacity: nextOpacity }}>
        <Freeze frame={0}>{renderItem(nextItem)}</Freeze>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const FadeToBlackProps = ({ props, onChange }) => (
  <div className="props-form">
    <label>
      Duration (frames @ 30fps)
      <input
        type="number"
        step="1"
        min="6"
        max="60"
        value={props.durationFrames}
        onChange={(e) =>
          onChange({ ...props, durationFrames: parseInt(e.target.value, 10) || 6 })
        }
      />
    </label>
  </div>
);

export default {
  id: 'fadeToBlack',
  label: 'Fade to Black',
  category: 'transition',
  defaultProps: { durationFrames: 20 },
  RemotionComponent: FadeToBlackRender,
  PropertiesEditor: FadeToBlackProps,
};
