import { AbsoluteFill } from 'remotion';

const PRESETS = {
  warm: 'sepia(0.15) saturate(1.15) brightness(1.02)',
  cool: 'saturate(0.9) hue-rotate(8deg) brightness(0.95)',
  cinematic: 'contrast(1.08) saturate(1.1) brightness(0.98)',
  night: 'saturate(0.75) brightness(0.88) hue-rotate(-12deg)',
};

const ColorGradeRender = ({ props, children }) => {
  const { preset = 'cinematic' } = props;
  const filter = PRESETS[preset] ?? PRESETS.cinematic;

  return (
    <AbsoluteFill style={{ filter }}>
      {children}
    </AbsoluteFill>
  );
};

const ColorGradeProps = ({ props, onChange }) => (
  <div className="props-form">
    <label>
      Preset
      <select
        value={props.preset}
        onChange={(e) => onChange({ ...props, preset: e.target.value })}
      >
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
        <option value="cinematic">Cinematic</option>
        <option value="night">Night</option>
      </select>
    </label>
  </div>
);

export default {
  id: 'colorGrade',
  label: 'Color Grade',
  category: 'effect',
  defaultProps: { preset: 'cinematic' },
  RemotionComponent: ColorGradeRender,
  PropertiesEditor: ColorGradeProps,
};
