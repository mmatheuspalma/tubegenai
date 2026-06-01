/**
 * TubeGen AI — Mock Data
 *
 * All mock data lives here. Import what you need into each scene.
 * Feel free to change any of this — it's just a starting point.
 */

// ---------------------------------------------------------------------------
// Scene 1 — Channel data
// ---------------------------------------------------------------------------

export const MOCK_CHANNEL = {
  url: "https://youtube.com/@MrBeast",
  handle: "@MrBeast",
  name: "MrBeast",
  subscribers: "248M",
  totalViews: "44.2B",
  videoCount: 812,
  niche: "Challenge & Philanthropy",
  avgViews: "89M",
  topTopics: [
    "Survival challenges",
    "Massive giveaways",
    "World records",
    "Helping strangers",
    "Last to leave wins",
  ],
};

// ---------------------------------------------------------------------------
// Scene 2 — Viral ideas
// ---------------------------------------------------------------------------

export const MOCK_IDEAS = [
  {
    id: 1,
    title: "I Spent 30 Days Doing Everything MrBeast Did",
    viralScore: 94,
    hook: "What happens when a regular person copies the world's biggest YouTuber?",
    tags: ["Challenge", "Trending", "High CTR"],
  },
  {
    id: 2,
    title: "Every MrBeast Challenge, Ranked by How Brutal They Actually Are",
    viralScore: 88,
    hook: "From easy to absolutely unhinged.",
    tags: ["Ranking", "MrBeast", "Watchable"],
  },
  {
    id: 3,
    title: "The MrBeast Formula: Why Every Video Has the Same Structure",
    viralScore: 82,
    hook: "There's a pattern. Nobody talks about it.",
    tags: ["Analysis", "Educational"],
  },
  {
    id: 4,
    title: "I Gave $1,000 to a Stranger Every Hour for 24 Hours",
    viralScore: 91,
    hook: "Inspired by MrBeast, but with real stakes.",
    tags: ["Giveaway", "High Budget"],
  },
  {
    id: 5,
    title: "What MrBeast's Team Won't Tell You About Going Viral",
    viralScore: 79,
    hook: "The inside story behind the algorithm.",
    tags: ["Deep Dive", "Creator Tips"],
  },
];

export const SELECTED_IDEA_ID = 1;

// ---------------------------------------------------------------------------
// Scene 3 — Script sections
// ---------------------------------------------------------------------------

export const MOCK_SCRIPT = {
  title: MOCK_IDEAS[0].title,
  wordCount: 847,
  estimatedRuntime: "6 min 20 sec",
  aiConfidence: 94,
  sections: [
    {
      label: "HOOK",
      timestamp: "0:00",
      lines: [
        "What if I told you I spent an entire month doing everything",
        "MrBeast does — every challenge, every giveaway, every crazy stunt.",
        "And what I found completely changed how I think about YouTube.",
      ],
    },
    {
      label: "INTRO",
      timestamp: "0:18",
      lines: [
        "Hey everyone. For those who don't know me, I'm a regular creator",
        "with about 40,000 subscribers. No team. No budget. Just a camera",
        "and a mission: decode the MrBeast formula.",
      ],
    },
    {
      label: "MAIN",
      timestamp: "1:05",
      lines: [
        "Day one: I tried to give away $1,000. Sounds simple, right?",
        "Wrong. The logistics alone took 4 hours. MrBeast does this",
        "before breakfast. That's when I realized — this is a system.",
      ],
    },
    {
      label: "CTA",
      timestamp: "5:50",
      lines: [
        "If this changed how you think about YouTube, subscribe.",
        "Next week I'm revealing the exact framework MrBeast uses",
        "to hook viewers in the first 8 seconds. You won't want to miss it.",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Scene 4 — Asset generation tracks
// ---------------------------------------------------------------------------

export const MOCK_ASSETS = [
  {
    id: "voice",
    icon: "🎤",
    label: "Voiceover",
    provider: "ElevenLabs",
    voiceName: "Adam",
    duration: "6:20",
  },
  {
    id: "visuals",
    icon: "🎨",
    label: "Visuals",
    provider: "Runway ML",
    sceneCount: 12,
    style: "Cinematic",
  },
  {
    id: "captions",
    icon: "💬",
    label: "Captions",
    provider: "TubeGen",
    wordCount: 847,
    style: "Bold Pop",
  },
  {
    id: "music",
    icon: "🎵",
    label: "Music",
    provider: "Suno AI",
    genre: "Cinematic Hip-Hop",
    bpm: 95,
  },
];

// ---------------------------------------------------------------------------
// Scene 5 — Editor timeline clips
// ---------------------------------------------------------------------------

export const MOCK_TIMELINE_CLIPS = [
  { id: 1, label: "Hook", start: 0, width: 90, color: "#7C3AED" },
  { id: 2, label: "Intro", start: 90, width: 130, color: "#8B5CF6" },
  { id: 3, label: "Day 1", start: 220, width: 160, color: "#A78BFA" },
  { id: 4, label: "Day 15", start: 380, width: 140, color: "#8B5CF6" },
  { id: 5, label: "CTA", start: 520, width: 80, color: "#7C3AED" },
];

export const MOCK_CAPTIONS = [
  { text: "What if I told you I spent 30 days...", start: 0 },
  { text: "doing EVERYTHING MrBeast does?", start: 45 },
  { text: "The logistics alone took 4 hours.", start: 90 },
  { text: "MrBeast does this before breakfast.", start: 130 },
];

// ---------------------------------------------------------------------------
// Scene 6 — Export / analytics
// ---------------------------------------------------------------------------

export const MOCK_ANALYTICS = {
  predictedViews48h: 124782,
  predictedRevenue: 892,
  suggestedPublishTime: "Thursday, 3:00 PM EST",
  ctrEstimate: "8.4%",
  avgWatchTime: "4:12",
  thumbnailScore: 91,
};
