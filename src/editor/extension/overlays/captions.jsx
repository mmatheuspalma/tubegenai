// Overlay: synced captions from a segment list.
// Each segment { text, startFrame, durationFrames } — absolute timeline frames.

import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const CaptionsRender = ({ props, ctx }) => {
  const localFrame = useCurrentFrame();
  const { item } = ctx;
  const absoluteFrame = (item?.startFrame ?? 0) + localFrame;
  const {
    segments = [],
    fontSize = 30,
    fontFamily = 'Inter, system-ui, sans-serif',
    textColor = '#FFFFFF',
    backgroundColor = 'rgba(0,0,0,0.72)',
    bottom = 72,
    maxWidth = '82%',
    fadeFrames = 5,
  } = props;

  const active = segments.find(
    (s) =>
      absoluteFrame >= s.startFrame &&
      absoluteFrame < s.startFrame + s.durationFrames
  );

  if (!active) return null;

  const localStart = active.startFrame - (item?.startFrame ?? 0);
  const localEnd = localStart + active.durationFrames;
  const fadeIn = interpolate(localFrame, [localStart, localStart + fadeFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    localFrame,
    [localEnd - fadeFrames, localEnd],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = Math.min(fadeIn, fadeOut);
  const slideY = interpolate(fadeIn, [0, 1], [8, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom,
          transform: `translateX(-50%) translateY(${slideY}px)`,
          opacity,
          maxWidth,
          padding: '10px 20px',
          background: backgroundColor,
          color: textColor,
          fontFamily,
          fontSize,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: 'center',
          borderRadius: 6,
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};

const CaptionsProps = ({ props, onChange }) => {
  const setN = (k) => (e) => onChange({ ...props, [k]: parseInt(e.target.value, 10) || 0 });
  const set = (k) => (e) => onChange({ ...props, [k]: e.target.value });
  const segments = props.segments ?? [];

  const updateSegment = (idx, text) => {
    const next = segments.map((s, i) => (i === idx ? { ...s, text } : s));
    onChange({ ...props, segments: next });
  };

  return (
    <div className="props-form">
      <label>Font size<input type="number" min="18" max="48" value={props.fontSize} onChange={setN('fontSize')} /></label>
      <label>Bottom (px)<input type="number" min="40" max="200" value={props.bottom} onChange={setN('bottom')} /></label>
      <label>Background<input type="text" value={props.backgroundColor} onChange={set('backgroundColor')} /></label>
      <p className="pp-hint">{segments.length} caption line{segments.length === 1 ? '' : 's'} — edit text below or regenerate from Smart tab.</p>
      <div className="caption-segment-list">
        {segments.map((seg, idx) => (
          <label key={`${seg.startFrame}-${idx}`} className="caption-segment-row">
            <span className="caption-segment-time">
              {(seg.startFrame / 30).toFixed(1)}s
            </span>
            <input
              type="text"
              value={seg.text}
              onChange={(e) => updateSegment(idx, e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default {
  id: 'captions',
  label: 'Captions',
  category: 'overlay',
  defaultProps: {
    segments: [],
    fontSize: 30,
    fontFamily: 'Inter, system-ui, sans-serif',
    textColor: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.72)',
    bottom: 72,
    maxWidth: '82%',
    fadeFrames: 5,
  },
  RemotionComponent: CaptionsRender,
  PropertiesEditor: CaptionsProps,
};
