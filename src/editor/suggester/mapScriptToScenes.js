/** Align voiceover script snippets to visual scenes by duration weight. */

export function mapScriptToScenes(scenes, scriptText) {
  const body = scriptText.replace(/^Title:.*(\n|$)/m, '').trim();
  const sentences = body
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (scenes.length === 0) return [];

  const totalFrames = scenes.reduce((sum, s) => sum + s.durationFrames, 0);
  let cursor = 0;

  return scenes.map((scene, index) => {
    const share = scene.durationFrames / totalFrames;
    const count = Math.max(1, Math.round(sentences.length * share));
    const chunk = sentences.slice(cursor, cursor + count).join(' ');
    cursor = Math.min(cursor + count, sentences.length);
    const fallback =
      cursor >= sentences.length ? '' : sentences[Math.min(index, sentences.length - 1)] ?? '';
    return {
      scene,
      index,
      scriptChunk: chunk || fallback,
    };
  });
}
