import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const FactCardRender = ({ props, ctx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationFrames } = ctx;
  const {
    headline = 'Did you know?',
    body = '',
    accentColor = '#7c5cff',
    backgroundColor = 'rgba(13, 17, 28, 0.92)',
    textColor = '#e4e7ee',
    enterFrames = 20,
    exitFrames = 15,
  } = props;

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: enterFrames });
  const exitStart = durationFrames - exitFrames;
  const exit = interpolate(frame, [exitStart, durationFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(enter, exit);
  const slideY = interpolate(enter, [0, 1], [60, 0]);

  return (
    <AbsoluteFill
      style={{
        background: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          transform: `translateY(${slideY}px)`,
          maxWidth: '72%',
          padding: '48px 56px',
          borderLeft: `6px solid ${accentColor}`,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, color: accentColor, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {headline}
        </div>
        <div style={{ fontSize: 42, fontWeight: 700, color: textColor, lineHeight: 1.25 }}>
          {body}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FactCardProps = ({ props, onChange }) => {
  const set = (k) => (e) => onChange({ ...props, [k]: e.target.value });
  const setN = (k) => (e) => onChange({ ...props, [k]: parseInt(e.target.value, 10) || 0 });
  return (
    <div className="props-form">
      <label>Headline<input type="text" value={props.headline} onChange={set('headline')} /></label>
      <label>Body<input type="text" value={props.body} onChange={set('body')} /></label>
      <label>Accent<input type="color" value={props.accentColor} onChange={set('accentColor')} /></label>
      <label>Background<input type="text" value={props.backgroundColor} onChange={set('backgroundColor')} /></label>
      <label>Text color<input type="color" value={props.textColor} onChange={set('textColor')} /></label>
      <label>Enter frames<input type="number" min="1" max="60" value={props.enterFrames} onChange={setN('enterFrames')} /></label>
      <label>Exit frames<input type="number" min="1" max="60" value={props.exitFrames} onChange={setN('exitFrames')} /></label>
    </div>
  );
};

export default {
  id: 'factCard',
  label: 'Fact Card',
  category: 'sceneType',
  defaultProps: {
    headline: 'Did you know?',
    body: 'Your fact here',
    accentColor: '#7c5cff',
    backgroundColor: 'rgba(13, 17, 28, 0.92)',
    textColor: '#e4e7ee',
    enterFrames: 20,
    exitFrames: 15,
  },
  RemotionComponent: FactCardRender,
  PropertiesEditor: FactCardProps,
};
