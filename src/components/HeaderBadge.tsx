import { useState } from 'react';
import { RotateCcw, Info, ShieldCheck } from 'lucide-react';

interface HeaderBadgeProps {
  onReset: () => void;
  showResetButton?: boolean;
}

export const HeaderBadge: React.FC<HeaderBadgeProps> = ({ onReset, showResetButton = true }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <>
      <header className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between gap-3 text-xs">
        {/* Demo Indicator Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200/70 text-rose-900 font-medium tracking-wide shadow-xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="font-semibold tracking-wider uppercase text-[10px] text-pink-700">DEMO</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-600 font-normal">Fictional profiles only</span>
          </div>

          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer focus-ring"
            title="How this prototype works"
            aria-label="How this prototype works"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {showResetButton && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-stone-500 hover:text-rose-900 hover:bg-rose-50/70 transition-colors text-xs font-medium cursor-pointer border border-transparent hover:border-rose-200/50 focus-ring"
              title="Reset questionnaire and start fresh"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset demo</span>
            </button>
          )}
        </div>
      </header>

      {/* Info Modal */}
      {showInfoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-rose-100 relative text-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-rose-900 font-semibold text-base mb-3">
              <ShieldCheck className="w-5 h-5 text-pink-600" />
              <span>Demo Boundary & Privacy</span>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-stone-600">
              <p>
                <strong className="text-stone-800">Prestinder</strong> is an interactive campus compatibility experiment prototype.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
                <li>
                  <strong className="text-stone-800">Strictly Fictional:</strong> No connection to real college IDs, student databases, Spotify, or external servers.
                </li>
                <li>
                  <strong className="text-stone-800">Sample ID Gate:</strong> Use the fictional demo ID <code className="px-1.5 py-0.5 rounded bg-rose-50 text-pink-700 font-mono">51110307042</code>.
                </li>
                <li>
                  <strong className="text-stone-800">Local Only:</strong> All questionnaire selections live only in your current browser session.
                </li>
                <li>
                  <strong className="text-stone-800">Playful Calculations:</strong> Wavelength overlaps and compatibility scores are fictional entertainment formulas, not scientific psychological tests.
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-rose-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium cursor-pointer transition-colors focus-ring"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
