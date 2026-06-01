/**
 * TubeGen AI Design System
 *
 * Start here before writing any scene code. Define your palette, spacing,
 * and spring configs once — then reference them everywhere. This is what
 * makes the video feel like a single coherent product vs. 6 disconnected slides.
 *
 * Every value below is a placeholder. Replace with your own design choices.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const C = {
  // Backgrounds — dark, layered
  bg: "#080810",           // primary canvas
  bgCard: "rgba(255,255,255,0.04)",   // glass panel fill
  bgCardStrong: "rgba(255,255,255,0.08)",

  // Brand — pick a palette that feels like a modern AI tool
  // Purple/violet is common in AI products; feel free to differentiate
  purple: "#7C3AED",
  violet: "#8B5CF6",
  purpleLight: "#A78BFA",
  pink: "#EC4899",
  pinkLight: "#F472B6",

  // Status / semantic
  gold: "#F59E0B",       // revenue, viral score, highlights
  goldLight: "#FCD34D",
  green: "#10B981",      // success, complete states
  greenLight: "#34D399",
  red: "#EF4444",        // errors, warnings
  blue: "#3B82F6",       // data, analytics

  // Text hierarchy
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  textMuted: "#475569",

  // UI chrome
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.15)",
};

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FONT = {
  // Load a proper font via @remotion/google-fonts or system fallbacks
  // Example: import { loadFont } from "@remotion/google-fonts/Inter";
  //          export const { fontFamily } = loadFont();
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif',
  mono: '"SF Mono", "Fira Code", "Consolas", monospace',
};

export const TEXT = {
  hero: { fontSize: 96, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 },
  h1:   { fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 },
  h2:   { fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 },
  h3:   { fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" },
  body: { fontSize: 18, fontWeight: 400, lineHeight: 1.6 },
  sm:   { fontSize: 14, fontWeight: 400 },
  label:{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const },
};

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// ---------------------------------------------------------------------------
// Spring configs
// ---------------------------------------------------------------------------
// Pass these as the `config` argument to Remotion's spring() function.
// Tune stiffness/damping to match the energy of your video.

export const SPRING = {
  // Snappy, immediate — good for UI elements popping in
  snappy: { stiffness: 200, damping: 22, mass: 1 },
  // Smooth, confident — good for panels and cards
  smooth: { stiffness: 80, damping: 20, mass: 1 },
  // Bouncy, playful — good for logo reveals and celebrations
  bouncy: { stiffness: 120, damping: 10, mass: 1 },
  // Gentle, slow — good for background elements
  gentle: { stiffness: 60, damping: 15, mass: 1 },
};

// ---------------------------------------------------------------------------
// Reusable style objects
// ---------------------------------------------------------------------------

export const gradientText = {
  background: `linear-gradient(135deg, ${C.violet}, ${C.pinkLight})`,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

export const glassPanel = {
  background: C.bgCard,
  border: `1px solid ${C.border}`,
  borderRadius: 20,
  backdropFilter: "blur(20px)",
};
