import React from 'react';

/**
 * BackgroundMarks: Bold baby-pink lines sweeping diagonally and irregularly
 * across the warm ivory background, like expressive hand-drawn marks / strokes.
 */
export const BackgroundMarks: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #ffffff 0%, #fffbf8 50%, #fdf5f0 100%)',
      }}
    >
      <svg
        className="w-full h-full object-cover opacity-85"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pinkStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#fda4af" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.10" />
          </linearGradient>

          <linearGradient id="pinkStroke2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#f472b6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="plumAccent" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#881337" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#701a75" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Primary bold baby-pink diagonal sweep from top-left to bottom-right */}
        <path
          d="M -120 180 C 260 80, 520 480, 940 320 C 1220 210, 1420 540, 1600 680"
          stroke="url(#pinkStroke1)"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bg-sweep-mark-1"
        />

        {/* Secondary irregular sweeping line crossing across lower section */}
        <path
          d="M 1550 140 C 1180 320, 840 220, 480 620 C 240 880, 60 760, -100 890"
          stroke="url(#pinkStroke2)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bg-sweep-mark-2"
        />

        {/* Delicate companion accent line */}
        <path
          d="M 80 -40 C 420 220, 780 180, 1140 490 C 1320 640, 1500 780, 1580 920"
          stroke="url(#pinkStroke1)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="18 12"
          opacity="0.6"
        />

        {/* Deep wine subtle arc */}
        <path
          d="M -60 640 C 320 580, 640 820, 1280 860"
          stroke="url(#plumAccent)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Subtle geometric harmonic marker dots */}
        <circle cx="280" cy="190" r="3" fill="#ec4899" opacity="0.35" />
        <circle cx="1180" cy="240" r="3.5" fill="#db2777" opacity="0.4" />
        <circle cx="940" cy="720" r="2.5" fill="#881337" opacity="0.25" />
      </svg>
    </div>
  );
};
