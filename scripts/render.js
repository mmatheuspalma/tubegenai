// Render the demo project headless to out/final.mp4.
//
// Usage:
//   npm run render
//     → renders public/demo/scenes.json (default)
//
//   npm run render -- --save path/to/scenes-export.json
//     → copies export into public/demo/scenes.json, then renders
//
//   npm run render -- path/to/scenes-export.json --save
//     → same (positional path also accepted)

import { execSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCENES_PATH = 'public/demo/scenes.json';
const OUT_PATH = 'out/final.mp4';

const args = process.argv.slice(2);
const save = args.includes('--save');
const fromFlagIdx = args.indexOf('--from');
const fromFlag = fromFlagIdx >= 0 ? args[fromFlagIdx + 1] : null;
const positional = args.filter((a) => !a.startsWith('--') && a !== fromFlag);
const inputPath = fromFlag || positional[0] || null;

mkdirSync('out', { recursive: true });

if (inputPath && save) {
  const src = resolve(inputPath);
  const raw = readFileSync(src, 'utf8');
  // Validate JSON before overwriting the project file.
  JSON.parse(raw);
  writeFileSync(SCENES_PATH, raw);
  console.log(`Updated ${SCENES_PATH} from ${src}`);
} else if (inputPath && !save) {
  console.warn(
    'Tip: pass --save to copy the export into public/demo/scenes.json before rendering.\n' +
      '     Example: npm run render -- --save ~/Downloads/scenes.json'
  );
}

const cmd = [
  'npx', 'remotion', 'render',
  'src/remotion/index.js',
  'main',
  OUT_PATH,
  '--concurrency=1',
].join(' ');

console.log('>', cmd);
execSync(cmd, { stdio: 'inherit' });
console.log(`\nDone → ${OUT_PATH}`);
