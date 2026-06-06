import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const KeywordCalloutRender = ({ props, ctx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationFrames } = ctx;
  const {
    text = 'Keyword',
    position = 'top',
    backgroundColor = 'rgba(124, 92, 255, 0.92)',
    textColor = '#FFFFFF',
    enterFrames = 14,
    exitFrames = 12,
  } = props;

  const enter = spring({ frame, fps, config: { damping: 180, stiffness: 140 }, durationInFrames: enterFrames });
  const exitStart = durationFrames - exitFrames;
  const exit = interpolate(frame, [exitStart, durationFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(enter, exit);
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const isTop = position === 'top';

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          ...(isTop ? { top: 72 } : { bottom: 120 }),
          transform: `translateX(-50%) scale(${scale})`,
          opacity,
          padding: '14px 32px',
          background: backgroundColor,
          color: textColor,
          borderRadius: 999,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const KeywordCalloutProps = ({ props, onChange }) => {
  const set = (k) => (e) => onChange({ ...props, [k]: e.target.value });
  const setN = (k) => (e) => onChange({ ...props, [k]: parseInt(e.target.value, 10) || 0 });
  return (
    <div className="props-form">
      <label>Text<input type="text" value={props.text} onChange={set('text')} /></label>
      <label>
        Position
        <select value={props.position} onChange={set('position')}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </label>
      <label>Background<input type="text" value={props.backgroundColor} onChange={set('backgroundColor')} /></label>
      <label>Text color<input type="color" value={props.textColor} onChange={set('textColor')} /></label>
      <label>Enter frames<input type="number" min="1" max="60" value={props.enterFrames} onChange={setN('enterFrames')} /></label>
      <label>Exit frames<input type="number" min="1" max="60" value={props.exitFrames} onChange={setN('exitFrames')} /></label>
    </div>
  );
};

export default {
  id: 'keywordCallout',
  label: 'Keyword Callout',
  category: 'overlay',
  defaultProps: {
    text: 'Keyword',
    position: 'top',
    backgroundColor: 'rgba(124, 92, 255, 0.92)',
    textColor: '#FFFFFF',
    enterFrames: 14,
    exitFrames: 12,
  },
  RemotionComponent: KeywordCalloutRender,
  PropertiesEditor: KeywordCalloutProps,
};
