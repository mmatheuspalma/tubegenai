// Timeline — multi-track view (Visuals, Overlays, Audio).

import { useRef } from 'react';
import { FPS, TRACK_TYPES, ITEM_TYPES } from './types';
import { itemsOnTrack } from './state';
import { getPrimitive } from './extension/primitives';

const PX_PER_FRAME = 4;
const GUTTER = 84;

const TRACKS = [
  { id: TRACK_TYPES.V1, label: 'Visuals' },
  { id: TRACK_TYPES.O1, label: 'Overlays' },
  { id: TRACK_TYPES.A1, label: 'Audio' },
];

const AUDIO_TYPES = new Set([ITEM_TYPES.VOICEOVER, ITEM_TYPES.SOUNDTRACK]);
const SCENE_TYPES = new Set([ITEM_TYPES.IMAGE, ITEM_TYPES.BROLL, ITEM_TYPES.ANIMATION]);

const frameToPx = (f) => f * PX_PER_FRAME;
const pxToFrame = (px) => Math.round(px / PX_PER_FRAME);
const basename = (src) => (src ? src.split('/').pop() : '');
const fmtTime = (frames) => {
  const s = frames / FPS;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
};

const clipBadges = (item) => {
  const badges = [];
  for (const e of item.effects ?? []) {
    const p = getPrimitive(e.id);
    if (p) badges.push({ id: e.id, label: p.label, kind: 'effect' });
  }
  if (item.transition) {
    const p = getPrimitive(item.transition.id);
    if (p) badges.push({ id: item.transition.id, label: p.label, kind: 'transition' });
  }
  return badges;
};

export default function Timeline({ state, dispatch, currentFrame = 0, onSeek }) {
  const contentRef = useRef(null);

  const totalFrames = Math.max(
    state.durationFrames,
    ...state.items.map((i) => i.startFrame + i.durationFrames),
    FPS * 5
  );
  const contentWidth = frameToPx(totalFrames) + 48;

  const seekFromEvent = (e) => {
    if (!onSeek || !contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - GUTTER;
    if (x < 0) return;
    onSeek(Math.max(0, Math.min(totalFrames, pxToFrame(x))));
  };
  const endScrub = () => {
    window.removeEventListener('pointermove', seekFromEvent);
    window.removeEventListener('pointerup', endScrub);
  };
  const startScrub = (e) => {
    seekFromEvent(e);
    window.addEventListener('pointermove', seekFromEvent);
    window.addEventListener('pointerup', endScrub);
  };
  const onSurfacePointerDown = (e) => {
    dispatch({ type: 'SELECT_ITEM', id: null });
    startScrub(e);
  };
  const onClipPointerDown = (e, item) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_ITEM', id: item.id });
    startScrub(e);
  };
  const onPlayheadPointerDown = (e) => {
    e.stopPropagation();
    startScrub(e);
  };

  const ticks = [];
  for (let f = 0; f <= totalFrames; f += FPS) ticks.push(f);

  return (
    <div className="timeline">
      <div className="tl-scroll">
        <div
          className="tl-content"
          ref={contentRef}
          style={{ width: contentWidth }}
          onPointerDown={onSurfacePointerDown}
        >
          <div className="tl-playhead" style={{ left: GUTTER + frameToPx(currentFrame) }}>
            <div className="tl-playhead-head" onPointerDown={onPlayheadPointerDown} />
          </div>

          <div className="tl-ruler" style={{ width: contentWidth }}>
            <div className="tl-gutter" />
            <div className="tl-lane tl-ruler-lane">
              {ticks.map((f) => (
                <div key={f} className="tl-tick" style={{ left: frameToPx(f) }}>
                  <span>{fmtTime(f)}</span>
                </div>
              ))}
            </div>
          </div>

          {TRACKS.map((track) => {
            const items = itemsOnTrack(state, track.id);
            return (
              <div key={track.id} className="tl-track">
                <div className="tl-gutter tl-track-label">{track.label}</div>
                <div className="tl-lane">
                  {items.map((item) => {
                    const isAudio = AUDIO_TYPES.has(item.type);
                    const selected = item.id === state.selectedItemId;
                    const primitive = item.primitiveId ? getPrimitive(item.primitiveId) : null;
                    const label = primitive?.label || basename(item.src) || item.type;
                    const badges = track.id === TRACK_TYPES.V1 ? clipBadges(item) : [];
                    const showTypeTag = SCENE_TYPES.has(item.type);
                    const transitionDur = item.transition
                      ? Math.min(
                          item.transition.props?.durationFrames ?? 15,
                          item.durationFrames
                        )
                      : 0;

                    return (
                      <div
                        key={item.id}
                        className={`tl-clip${isAudio ? ' is-audio' : ''}${
                          track.id === TRACK_TYPES.O1 ? ' is-overlay' : ''
                        }${selected ? ' is-selected' : ''}${
                          badges.length ? ' has-badges' : ''
                        }`}
                        style={{
                          left: frameToPx(item.startFrame),
                          width: frameToPx(item.durationFrames),
                        }}
                        onPointerDown={(e) => onClipPointerDown(e, item)}
                        title={
                          badges.length
                            ? `${label} · ${badges.map((b) => b.label).join(', ')}`
                            : label
                        }
                      >
                        {item.transition && transitionDur > 0 && (
                          <div
                            className="tl-clip-transition"
                            style={{ width: frameToPx(transitionDur) }}
                          />
                        )}
                        <span className="tl-clip-label">
                          {isAudio ? '♪ ' : ''}
                          {label}
                        </span>
                        {showTypeTag && (
                          <span className={`tl-clip-type tl-clip-type--${item.type}`}>
                            {item.type}
                          </span>
                        )}
                        {badges.length > 0 && (
                          <div className="tl-clip-badges">
                            {badges.slice(0, 3).map((b) => (
                              <span
                                key={b.id}
                                className={`tl-badge tl-badge--${b.kind}`}
                              >
                                {b.label}
                              </span>
                            ))}
                            {badges.length > 3 && (
                              <span className="tl-badge tl-badge--more">
                                +{badges.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
