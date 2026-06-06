import { useState } from 'react';
import { ITEM_TYPES, TRACK_TYPES } from './types';
import { generateSuggestions, getStoredApiKey, storeApiKey } from './suggester/index.js';
import { getPrimitive } from './extension/primitives';

const basename = (src) => (src ? src.split('/').pop() : '');

export function applySuggestion(dispatch, suggestion) {
  const primitive = getPrimitive(suggestion.primitiveId);
  if (!primitive) return;

  if (suggestion.kind === 'effect') {
    dispatch({
      type: 'APPLY_EFFECT',
      itemId: suggestion.sceneId,
      primitiveId: suggestion.primitiveId,
      props: { ...primitive.defaultProps, ...suggestion.props },
    });
  } else if (suggestion.kind === 'transition') {
    dispatch({
      type: 'SET_TRANSITION',
      itemId: suggestion.sceneId,
      transition: {
        id: suggestion.primitiveId,
        props: { ...primitive.defaultProps, ...suggestion.props },
      },
    });
  } else if (suggestion.kind === 'overlay' || suggestion.kind === 'sceneType') {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        type: suggestion.kind === 'sceneType' ? ITEM_TYPES.SCENE_TYPE : ITEM_TYPES.OVERLAY,
        trackId: TRACK_TYPES.O1,
        startFrame: suggestion.startFrame ?? 0,
        durationFrames: suggestion.durationFrames ?? 60,
        primitiveId: suggestion.primitiveId,
        primitiveProps: { ...primitive.defaultProps, ...suggestion.props },
      },
    });
  }
}

export default function SmartSuggestPanel({ scenes, dispatch, onClose }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [picked, setPicked] = useState(() => new Set());

  const run = async (preferAi) => {
    setLoading(true);
    setError(null);
    storeApiKey(apiKey);
    try {
      const result = await generateSuggestions(scenes, { apiKey, preferAi });
      setSuggestions(result.suggestions);
      setSource(result.source);
      setPicked(new Set(result.suggestions.map((s) => s.id)));
    } catch (err) {
      if (preferAi && apiKey.trim()) {
        try {
          const fallback = await generateSuggestions(scenes, { preferAi: false });
          setSuggestions(fallback.suggestions);
          setSource('heuristics');
          setPicked(new Set(fallback.suggestions.map((s) => s.id)));
          setError(`AI unavailable (${err.message}). Showing offline suggestions.`);
        } catch {
          setError(err.message);
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const applyPicked = () => {
    suggestions.filter((s) => picked.has(s.id)).forEach((s) => applySuggestion(dispatch, s));
    onClose();
  };

  const sceneLabel = (s) => {
    const scene = scenes[s.sceneIndex];
    return scene ? basename(scene.src) || `Scene ${s.sceneIndex + 1}` : s.sceneId;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <h3>Smart Enhance</h3>
          {source && (
            <span className={`smart-source smart-source--${source}`}>
              {source === 'ai' ? 'AI' : 'Offline'}
            </span>
          )}
        </header>

        <div className="smart-body">
          <p className="muted smart-intro">
            Reads <code>script.txt</code> and scene timing, then suggests effects, transitions,
            and overlays. You review before anything is applied.
          </p>

          <label className="smart-key-row">
            <span>OpenAI key</span>
            <input
              type="password"
              placeholder="sk-… (optional — session only)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="off"
            />
          </label>

          <div className="smart-actions">
            <button
              className="btn-primary"
              disabled={loading || scenes.length === 0}
              onClick={() => run(!!apiKey.trim())}
            >
              {loading ? 'Analyzing…' : apiKey.trim() ? 'Analyze with AI' : 'Suggest (offline)'}
            </button>
            {apiKey.trim() && (
              <button className="btn-secondary" disabled={loading} onClick={() => run(false)}>
                Offline only
              </button>
            )}
          </div>

          {error && <p className="smart-error">{error}</p>}

          {suggestions.length > 0 && (
            <>
              <div className="modal-actions-top">
                <button onClick={() => setPicked(new Set(suggestions.map((s) => s.id)))}>
                  Select all
                </button>
                <button onClick={() => setPicked(new Set())}>Clear</button>
                <span className="muted">{picked.size} selected</span>
              </div>

              <ul className="smart-list">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={picked.has(s.id)}
                        onChange={() => toggle(s.id)}
                      />
                      <div className="smart-item">
                        <div className="smart-item-head">
                          <span className="smart-scene">{sceneLabel(s)}</span>
                          <span className={`effect-cat effect-cat--${s.kind === 'sceneType' ? 'sceneType' : s.kind}`}>
                            {s.kind}
                          </span>
                          <span className="smart-primitive">{s.label}</span>
                        </div>
                        <p className="smart-reason">{s.reason}</p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <footer className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            disabled={picked.size === 0}
            onClick={applyPicked}
          >
            Apply {picked.size} suggestion{picked.size === 1 ? '' : 's'}
          </button>
        </footer>
      </div>
    </div>
  );
}
