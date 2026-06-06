import { AbsoluteFill } from 'remotion';

const VignetteRender = ({ props, children }) => {
  const { intensity = 0.55, size = 55 } = props;
  const spread = Math.max(10, Math.min(90, size));

  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, transparent ${spread}%, rgba(0,0,0,${intensity}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const VignetteProps = ({ props, onChange }) => (
  <div className="props-form">
    <label>
      Intensity
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={props.intensity}
        onChange={(e) => onChange({ ...props, intensity: parseFloat(e.target.value) })}
      />
    </label>
    <label>
      Size (%)
      <input
        type="number"
        min="20"
        max="80"
        value={props.size}
        onChange={(e) => onChange({ ...props, size: parseInt(e.target.value, 10) || 55 })}
      />
    </label>
  </div>
);

export default {
  id: 'vignette',
  label: 'Vignette',
  category: 'effect',
  defaultProps: { intensity: 0.55, size: 55 },
  RemotionComponent: VignetteRender,
  PropertiesEditor: VignetteProps,
};
