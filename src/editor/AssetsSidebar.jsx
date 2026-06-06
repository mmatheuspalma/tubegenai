// AssetsSidebar — left-hand pane. Tabs for the demo asset library and the primitive
// library. The asset list comes from /demo/manifest.json (generated at dev/build time
// by scripts/gen-manifest.mjs), so nothing is hardcoded — drop a file into
// public/demo/assets and it shows up here on the next dev start.
//
// Tabs:
//   - Visuals  — clips on disk (browse the demo bundle).
//   - Audio    — voiceover (and any other audio).
//   - Effects  — effect + transition primitives; pick scenes to apply.
//   - Overlays — overlay + sceneType primitives; place on the timeline.

import { useEffect, useState } from 'react';
import { FPS, ITEM_TYPES, TRACK_TYPES } from './types';
import { itemsOnTrack } from './state';
import { getPrimitivesByCategory } from './extension/primitives';
import SmartSuggestPanel from './SmartSuggestPanel';
import { applyCaptions } from './suggester/applyCaptions.js';

const TABS = ['Visuals', 'Audio', 'Effects', 'Overlays', 'Smart'];
const basename = (src) => (src ? src.split('/').pop() : '');

function AssetCard({ asset, kind }) {
  const [duration, setDuration] = useState(null);

  return (
    <div className="asset-card">
      {kind === 'visual' ? (
        <video
          className="asset-thumb"
          src={`${asset.src}#t=0.1`}
          muted
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
      ) : (
        <div className="asset-thumb asset-thumb-audio">♪</div>
      )}
      {kind === 'audio' && (
        <audio
          src={asset.src}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
      )}
      <div className="asset-meta">
        <span className="asset-name" title={asset.name}>
          {asset.name}
        </span>
        <span className="asset-dur">{duration ? `${duration.toFixed(1)}s` : '…'}</span>
      </div>
    </div>
  );
}

export default function AssetsSidebar({ state, dispatch }) {
  const [tab, setTab] = useState('Visuals');
  const [manifest, setManifest] = useState({ visuals: [], audio: [] });
  const [modalEffect, setModalEffect] = useState(null);
  const [picked, setPicked] = useState(() => new Set());
  const [overlayModal, setOverlayModal] = useState(null);
  const [overlayStart, setOverlayStart] = useState(0);
  const [overlayDuration, setOverlayDuration] = useState(90);
  const [smartOpen, setSmartOpen] = useState(false);
  const [captionsLoading, setCaptionsLoading] = useState(false);
  const [captionsMsg, setCaptionsMsg] = useState(null);

  useEffect(() => {
    fetch('/demo/manifest.json')
      .then((r) => (r.ok ? r.json() : { visuals: [], audio: [] }))
      .then((m) => setManifest({ visuals: m.visuals ?? [], audio: m.audio ?? [] }))
      .catch(() => {});
  }, []);

  const scenes = itemsOnTrack(state, TRACK_TYPES.V1);

  const eligible = (primitive, i) =>
    primitive.canApply ? !!primitive.canApply(scenes[i], scenes[i + 1]) : true;
  const eligibleIds = (primitive) =>
    scenes.filter((_, i) => eligible(primitive, i)).map((s) => s.id);

  const openEffectModal = (primitive) => {
    setModalEffect(primitive);
    setPicked(new Set(eligibleIds(primitive)));
  };
  const closeModal = () => setModalEffect(null);

  const togglePick = (id) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const applyEffectToPicked = () => {
    scenes.forEach((scene) => {
      if (!picked.has(scene.id)) return;
      if (modalEffect.category === 'transition') {
        dispatch({
          type: 'SET_TRANSITION',
          itemId: scene.id,
          transition: { id: modalEffect.id, props: { ...modalEffect.defaultProps } },
        });
      } else {
        dispatch({
          type: 'APPLY_EFFECT',
          itemId: scene.id,
          primitiveId: modalEffect.id,
          props: { ...modalEffect.defaultProps },
        });
      }
    });
    closeModal();
  };

  const openOverlayModal = (primitive) => {
    setOverlayModal(primitive);
    setOverlayStart(0);
    setOverlayDuration(Math.min(90, state.durationFrames || 90));
  };

  const addOverlay = () => {
    if (!overlayModal) return;
    const itemType =
      overlayModal.category === 'sceneType' ? ITEM_TYPES.SCENE_TYPE : ITEM_TYPES.OVERLAY;
    dispatch({
      type: 'ADD_ITEM',
      item: {
        type: itemType,
        trackId: TRACK_TYPES.O1,
        startFrame: overlayStart,
        durationFrames: overlayDuration,
        primitiveId: overlayModal.id,
        primitiveProps: { ...overlayModal.defaultProps },
      },
    });
    setOverlayModal(null);
  };

  const generateCaptions = async () => {
    setCaptionsLoading(true);
    setCaptionsMsg(null);
    try {
      const count = await applyCaptions(
        dispatch,
        state.items,
        state.durationFrames,
        scenes
      );
      setCaptionsMsg(`Added ${count} caption lines synced to the voiceover.`);
    } catch (err) {
      setCaptionsMsg(err.message);
    } finally {
      setCaptionsLoading(false);
    }
  };

  return (
    <aside className="assets-sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">TG</span>
        <div className="sidebar-brand-text">
          <span className="sidebar-title">TubeGen</span>
          <span className="sidebar-subtitle">Video Editor</span>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab${tab === t ? ' is-active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Visuals' && (
        <div className="asset-grid">
          {manifest.visuals.length === 0 && <p className="muted">No visuals found.</p>}
          {manifest.visuals.map((a) => (
            <AssetCard key={a.src} asset={a} kind="visual" />
          ))}
        </div>
      )}

      {tab === 'Audio' && (
        <div className="asset-grid">
          {manifest.audio.length === 0 && <p className="muted">No audio found.</p>}
          {manifest.audio.map((a) => (
            <AssetCard key={a.src} asset={a} kind="audio" />
          ))}
        </div>
      )}

      {tab === 'Effects' && (
        <div className="effects-list">
          <p className="muted">Apply to one or more scenes on the Visuals track.</p>
          {[
            { cat: 'effect', label: 'Camera & look' },
            { cat: 'transition', label: 'Transitions' },
          ].map(({ cat, label }) => (
            <div key={cat} className="effects-group">
              <h4 className="effects-group-title">{label}</h4>
              {getPrimitivesByCategory(cat).map((p) => (
                <button key={p.id} className="effect-item" onClick={() => openEffectModal(p)}>
                  <span className={`effect-cat effect-cat--${p.category}`}>{p.category}</span>
                  <span className="effect-label">{p.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'Overlays' && (
        <div className="effects-list">
          <p className="muted">Place on the Overlays track at a specific time.</p>
          {[
            { cat: 'overlay', label: 'Overlays' },
            { cat: 'sceneType', label: 'Scene types' },
          ].map(({ cat, label }) => (
            <div key={cat} className="effects-group">
              <h4 className="effects-group-title">{label}</h4>
              {getPrimitivesByCategory(cat).map((p) => (
                <button key={p.id} className="effect-item" onClick={() => openOverlayModal(p)}>
                  <span className={`effect-cat effect-cat--${p.category}`}>{p.category}</span>
                  <span className="effect-label">{p.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'Smart' && (
        <div className="smart-tab">
          <p className="muted">
            Content-aware editing: analyzes the voiceover script and scene types, then
            suggests effects, transitions, and overlays for your review.
          </p>
          <ul className="smart-tab-list">
            <li>Maps script beats to each scene by duration</li>
            <li>AI mode with an OpenAI key, or offline heuristics</li>
            <li>Nothing applies until you confirm</li>
          </ul>
          <button
            className="btn-primary smart-tab-btn"
            disabled={scenes.length === 0}
            onClick={() => setSmartOpen(true)}
          >
            Open Smart Enhance
          </button>

          <div className="smart-divider" />

          <h4 className="effects-group-title">Captions from script</h4>
          <p className="muted smart-caption-hint">
            Builds synced caption lines from <code>script.txt</code>, timed to the
            voiceover. Replaces any existing Captions overlay.
          </p>
          <button
            className="btn-secondary smart-tab-btn"
            disabled={captionsLoading || state.durationFrames === 0}
            onClick={generateCaptions}
          >
            {captionsLoading ? 'Generating…' : 'Generate captions'}
          </button>
          {captionsMsg && <p className="smart-caption-msg">{captionsMsg}</p>}
        </div>
      )}

      {smartOpen && (
        <SmartSuggestPanel
          scenes={scenes}
          dispatch={dispatch}
          onClose={() => setSmartOpen(false)}
        />
      )}

      {modalEffect && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Apply “{modalEffect.label}”</h3>
              <span className="muted">{picked.size} selected</span>
            </header>

            {modalEffect.category === 'transition' && modalEffect.id === 'crossfade' && (
              <p className="muted">
                Crossfade only applies at image→image boundaries — other scenes are disabled.
              </p>
            )}

            <div className="modal-actions-top">
              <button onClick={() => setPicked(new Set(eligibleIds(modalEffect)))}>Select all</button>
              <button onClick={() => setPicked(new Set())}>Clear</button>
            </div>

            <ul className="scene-list">
              {scenes.length === 0 && <li className="muted">No scenes on the Visuals track.</li>}
              {scenes.map((scene, i) => {
                const ok = eligible(modalEffect, i);
                return (
                  <li key={scene.id}>
                    <label className={ok ? '' : 'is-disabled'}>
                      <input
                        type="checkbox"
                        disabled={!ok}
                        checked={picked.has(scene.id)}
                        onChange={() => togglePick(scene.id)}
                      />
                      <span className="scene-idx">{i + 1}</span>
                      <span className="scene-name">{basename(scene.src) || scene.id}</span>
                      {!ok && <span className="scene-note">not eligible</span>}
                    </label>
                  </li>
                );
              })}
            </ul>

            <footer className="modal-foot">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button
                className="btn-primary"
                disabled={picked.size === 0}
                onClick={applyEffectToPicked}
              >
                Apply to {picked.size} scene{picked.size === 1 ? '' : 's'}
              </button>
            </footer>
          </div>
        </div>
      )}

      {overlayModal && (
        <div className="modal-overlay" onClick={() => setOverlayModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-head">
              <h3>Add “{overlayModal.label}”</h3>
            </header>
            <div className="props-form" style={{ padding: '0 16px' }}>
              <label>
                Start frame
                <input
                  type="number"
                  min="0"
                  max={state.durationFrames}
                  value={overlayStart}
                  onChange={(e) => setOverlayStart(parseInt(e.target.value, 10) || 0)}
                />
              </label>
              <label>
                Start time
                <span>{(overlayStart / FPS).toFixed(2)}s</span>
              </label>
              <label>
                Duration (frames)
                <input
                  type="number"
                  min="15"
                  max={state.durationFrames}
                  value={overlayDuration}
                  onChange={(e) => setOverlayDuration(parseInt(e.target.value, 10) || 15)}
                />
              </label>
            </div>
            <footer className="modal-foot">
              <button className="btn-secondary" onClick={() => setOverlayModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={addOverlay}>Add to timeline</button>
            </footer>
          </div>
        </div>
      )}
    </aside>
  );
}
