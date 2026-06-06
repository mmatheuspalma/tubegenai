import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const TitleCardRender = ({ props, ctx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationFrames } = ctx;
  const {
    title = 'Title',
    subtitle = '',
    backgroundColor = 'rgba(0,0,0,0.75)',
    textColor = '#FFFFFF',
    accentColor = '#7c5cff',
    enterFrames = 18,
    exitFrames = 15,
  } = props;

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: enterFrames });
  const exitStart = durationFrames - exitFrames;
  const exit = interpolate(frame, [exitStart, durationFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(enter, exit);
  const translateY = interpolate(enter, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: 'Inter, system-ui, sans-serif',
        textAlign: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          width: 80,
          height: 4,
          background: accentColor,
          marginBottom: 32,
          borderRadius: 2,
        }}
      />
      <div style={{ fontSize: 64, fontWeight: 800, color: textColor, lineHeight: 1.1, maxWidth: '85%' }}>
        {title}
      </div>
      {subtitle ? (
        <div style={{ fontSize: 28, color: textColor, opacity: 0.8, marginTop: 20, maxWidth: '75%' }}>
          {subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const TitleCardProps = ({ props, onChange }) => {
  const set = (k) => (e) => onChange({ ...props, [k]: e.target.value });
  const setN = (k) => (e) => onChange({ ...props, [k]: parseInt(e.target.value, 10) || 0 });
  return (
    <div className="props-form">
      <label>Title<input type="text" value={props.title} onChange={set('title')} /></label>
      <label>Subtitle<input type="text" value={props.subtitle} onChange={set('subtitle')} /></label>
      <label>Background<input type="text" value={props.backgroundColor} onChange={set('backgroundColor')} /></label>
      <label>Text color<input type="color" value={props.textColor} onChange={set('textColor')} /></label>
      <label>Accent<input type="color" value={props.accentColor} onChange={set('accentColor')} /></label>
      <label>Enter frames<input type="number" min="1" max="60" value={props.enterFrames} onChange={setN('enterFrames')} /></label>
      <label>Exit frames<input type="number" min="1" max="60" value={props.exitFrames} onChange={setN('exitFrames')} /></label>
    </div>
  );
};

export default {
  id: 'titleCard',
  label: 'Title Card',
  category: 'overlay',
  defaultProps: {
    title: 'Title',
    subtitle: '',
    backgroundColor: 'rgba(0,0,0,0.75)',
    textColor: '#FFFFFF',
    accentColor: '#7c5cff',
    enterFrames: 18,
    exitFrames: 15,
  },
  RemotionComponent: TitleCardRender,
  PropertiesEditor: TitleCardProps,
};
