import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const KenBurnsRender = ({ props, ctx, children }) => {
  const frame = useCurrentFrame();
  const { durationFrames } = ctx;
  const {
    startScale = 1.05,
    endScale = 1.18,
    startX = 0,
    endX = -4,
    startY = 0,
    endY = -2,
  } = props;

  const t = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = startScale + (endScale - startScale) * t;
  const x = startX + (endX - startX) * t;
  const y = startY + (endY - startY) * t;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${x}%, ${y}%)`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const KenBurnsProps = ({ props, onChange }) => {
  const setN = (k) => (e) => onChange({ ...props, [k]: parseFloat(e.target.value) || 0 });
  return (
    <div className="props-form">
      <label>Start scale<input type="number" step="0.02" min="1" max="1.5" value={props.startScale} onChange={setN('startScale')} /></label>
      <label>End scale<input type="number" step="0.02" min="1" max="1.5" value={props.endScale} onChange={setN('endScale')} /></label>
      <label>Start X (%)<input type="number" step="0.5" min="-15" max="15" value={props.startX} onChange={setN('startX')} /></label>
      <label>End X (%)<input type="number" step="0.5" min="-15" max="15" value={props.endX} onChange={setN('endX')} /></label>
      <label>Start Y (%)<input type="number" step="0.5" min="-15" max="15" value={props.startY} onChange={setN('startY')} /></label>
      <label>End Y (%)<input type="number" step="0.5" min="-15" max="15" value={props.endY} onChange={setN('endY')} /></label>
    </div>
  );
};

export default {
  id: 'kenBurns',
  label: 'Ken Burns',
  category: 'effect',
  defaultProps: { startScale: 1.05, endScale: 1.18, startX: 0, endX: -4, startY: 0, endY: -2 },
  RemotionComponent: KenBurnsRender,
  PropertiesEditor: KenBurnsProps,
};
