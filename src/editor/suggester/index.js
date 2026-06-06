import { suggestWithHeuristics } from './heuristics.js';
import { suggestWithAI } from './ai.js';

const SCRIPT_URL = '/demo/assets/script.txt';
const API_KEY_STORAGE = 'tubegen-openai-key';

export async function loadScript() {
  const res = await fetch(SCRIPT_URL);
  if (!res.ok) throw new Error('Could not load script.txt');
  return res.text();
}

export function getStoredApiKey() {
  try {
    return sessionStorage.getItem(API_KEY_STORAGE) ?? import.meta.env.VITE_OPENAI_API_KEY ?? '';
  } catch {
    return import.meta.env.VITE_OPENAI_API_KEY ?? '';
  }
}

export function storeApiKey(key) {
  try {
    if (key) sessionStorage.setItem(API_KEY_STORAGE, key);
    else sessionStorage.removeItem(API_KEY_STORAGE);
  } catch {
    /* sessionStorage unavailable */
  }
}

/** @returns {Promise<{ suggestions: object[], source: 'ai' | 'heuristics' }>} */
export async function generateSuggestions(scenes, { apiKey, preferAi = true } = {}) {
  const scriptText = await loadScript();
  const key = apiKey?.trim() || getStoredApiKey();

  if (preferAi && key) {
    try {
      const suggestions = await suggestWithAI(scenes, scriptText, key);
      if (suggestions.length > 0) {
        return { suggestions, source: 'ai' };
      }
    } catch (err) {
      console.warn('AI suggester failed, falling back to heuristics:', err);
      throw err;
    }
  }

  return {
    suggestions: suggestWithHeuristics(scenes, scriptText),
    source: 'heuristics',
  };
}

export { suggestWithHeuristics, suggestWithAI };
