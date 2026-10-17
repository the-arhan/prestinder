import { useEffect } from 'react';
import type { FictionalStudent } from '../types';
import { Check, ArrowLeft, CornerDownLeft, X, Sparkles } from 'lucide-react';

interface IdentityConfirmationProps {
  student: FictionalStudent;
  onConfirm: () => void;
  onReject: () => void;
}

export const IdentityConfirmation: React.FC<IdentityConfirmationProps> = ({
  student,
  onConfirm,
  onReject,
}) => {
  // Listen for Enter and Escape keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onReject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onConfirm, onReject]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 sm:py-16 flex flex-col items-center justify-center min-h-[70vh]">
      {/* Centered Floating Paper Invitation with gentle reveal */}
      <div className="w-full paper-invitation p-8 sm:p-12 text-center space-y-8 motion-reveal motion-float relative">
        
        {/* Decorative subtle paper fleck / stardust glints */}
        <div className="absolute top-4 right-5 text-pink-400/60 glint-sparkle pointer-events-none" aria-hidden="true">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-5 left-5 text-purple-400/50 glint-sparkle pointer-events-none" style={{ animationDelay: '1.4s' }} aria-hidden="true">
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Status Pill with Harmonic Pulse */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-xs text-rose-900 font-medium shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span>Fictional Profile Matched</span>
          <span className="text-stone-300">•</span>
          <code className="font-mono text-stone-600 font-semibold">{student.maskedId}</code>
        </div>

        {/* Greeting Heading with Gentle Upward Drift */}
        <div className="space-y-3">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.035em',
            }}
          >
            Hello, <span className="text-rose-950">{student.name}.</span>
          </h2>
          <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
            Please confirm your identity before we begin your 12-question compatibility transmission.
          </p>
        </div>

        {/* Keyboard instructions with keycap appearance */}
        <div className="py-2 flex flex-col items-center gap-2 text-xs text-stone-500">
          <div className="flex items-center gap-2 bg-stone-50/80 px-3 py-1.5 rounded-xl border border-stone-200/70 shadow-2xs">
            <kbd className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-stone-800 font-mono text-[11px] shadow-2xs flex items-center gap-1 font-semibold">
              <span>Enter</span>
              <CornerDownLeft className="w-3 h-3 text-pink-600" />
            </kbd>
            <span className="text-stone-700 font-medium">if that’s you</span>
          </div>

          <div className="flex items-center gap-2 bg-stone-50/80 px-3 py-1.5 rounded-xl border border-stone-200/70 shadow-2xs">
            <kbd className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-stone-800 font-mono text-[11px] shadow-2xs flex items-center gap-1 font-semibold">
              <span>Esc</span>
              <X className="w-3 h-3 text-stone-500" />
            </kbd>
            <span className="text-stone-700 font-medium">if that’s someone else</span>
          </div>
        </div>

        {/* Touch & Click Friendly Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={onConfirm}
            className="btn-primary w-full sm:w-auto min-w-[160px]"
          >
            <Check className="w-4 h-4 text-pink-300" />
            <span>That’s me</span>
          </button>

          <button
            type="button"
            onClick={onReject}
            className="btn-secondary w-full sm:w-auto min-w-[140px]"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500" />
            <span>Go back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
