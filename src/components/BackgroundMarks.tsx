import React from 'react';

/**
 * BackgroundMarks: Hand-drawn baby-pink strokes sweeping across warm ivory paper.
 * Implements the "Draw" and "Float" motion language with restrained CPU usage
 * and disabled parallax/motion on mobile and reduced-motion preferences.
 */
export const BackgroundMarks: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
      style={{
        background: 'radial-gradient(ellipse at 50% 15%, #ffffff 0%, #fdfbf7 50%, #f8f1ea 100%)',
      }}
    >
      <svg
        className="w-full h-full object-cover opacity-90 transition-transform duration-1000 ease-out"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Hand-drawn baby pink primary stroke */}
          <linearGradient id="pinkStrokeDraw1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.50" />
            <stop offset="50%" stopColor="#f9a8d4" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.08" />
          </linearGradient>

          {/* Cross-cutting expressive stroke */}
          <linearGradient id="pinkStrokeDraw2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.40" />
            <stop offset="45%" stopColor="#f472b6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.08" />
          </linearGradient>

          {/* Deep Plum & Wine accent ribbon */}
          <linearGradient id="wineAccentRibbon" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#881337" stopOpacity="0.09" />
            <stop offset="60%" stopColor="#701a75" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.0" />
          </linearGradient>

          {/* Soft Lavender Science Fair Glint */}
          <linearGradient id="lavenderGlintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Primary Hand-Drawn Diagonal Sweep: animated via draw-stroke-1 */}
        <path
          d="M -120 170 C 240 70, 520 460, 950 310 C 1240 200, 1430 520, 1620 660"
          stroke="url(#pinkStrokeDraw1)"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-stroke-1"
        />

        {/* Secondary Expressive Line: animated via draw-stroke-2 */}
        <path
          d="M 1560 130 C 1190 310, 850 210, 470 610 C 230 870, 50 750, -110 880"
          stroke="url(#pinkStrokeDraw2)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-stroke-2"
        />

        {/* Delicate Companion Accent: animated via draw-stroke-3 */}
        <path
          d="M 70 -50 C 410 210, 770 170, 1130 480 C 1310 630, 1490 770, 1570 910"
          stroke="url(#pinkStrokeDraw1)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="16 12"
          opacity="0.65"
          className="draw-stroke-3"
        />

        {/* Deep Plum Baseline Sweep */}
        <path
          d="M -70 630 C 310 570, 630 810, 1290 850"
          stroke="url(#wineAccentRibbon)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Secret Science Fair Celestial Harmonic Nodes (Lavender & Pink Glints) */}
        <g className="glint-sparkle">
          <circle cx="270" cy="180" r="3.5" fill="#f472b6" opacity="0.6" />
          <circle cx="270" cy="180" r="7" stroke="#fbcfe8" strokeWidth="1" opacity="0.4" />
        </g>

        <g className="glint-sparkle" style={{ animationDelay: '1.2s' }}>
          <circle cx="1190" cy="230" r="3" fill="#c084fc" opacity="0.55" />
          <circle cx="1190" cy="230" r="8" stroke="#e9d5ff" strokeWidth="1" opacity="0.35" />
        </g>

        <g className="glint-sparkle" style={{ animationDelay: '0.6s' }}>
          <circle cx="930" cy="710" r="2.5" fill="#881337" opacity="0.3" />
        </g>

        {/* Subtle Constellation Alignment Arc */}
        <path
          d="M 270 180 Q 720 120 1190 230"
          stroke="url(#lavenderGlintGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};
