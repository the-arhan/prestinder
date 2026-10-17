import { useEffect } from 'react';
import type { FictionalStudent } from '../types';
import { Check, ArrowLeft, CornerDownLeft, X } from 'lucide-react';

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
      {/* Centered borderless softly shadowed panel with restrained dissolve entrance */}
      <div className="w-full bg-white/95 rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(136,19,55,0.09),0_10px_25px_-5px_rgba(0,0,0,0.03)] border border-rose-100/70 text-center space-y-8 animate-dissolve">
        {/* Subtle status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/50 text-xs text-rose-900 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          <span>Fictional Profile Matched</span>
          <span className="text-stone-300">•</span>
          <code className="font-mono text-stone-600">{student.maskedId}</code>
        </div>

        {/* Greeting Heading */}
        <div className="space-y-3">
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.03em',
            }}
          >
            Hello, <span className="text-rose-950 font-bold">{student.name}.</span>
          </h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            Please confirm your identity before we begin your 12-question compatibility transmission.
          </p>
        </div>

        {/* Keyboard instructions */}
        <div className="py-2 flex flex-col items-center gap-1.5 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[11px] shadow-2xs flex items-center gap-1">
              <span>Enter</span>
              <CornerDownLeft className="w-3 h-3" />
            </kbd>
            <span>if that’s you</span>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[11px] shadow-2xs flex items-center gap-1">
              <span>Esc</span>
              <X className="w-3 h-3" />
            </kbd>
            <span>if that’s someone else</span>
          </div>
        </div>

        {/* Touch & Click Friendly Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto min-w-[160px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-stone-900 via-rose-950 to-pink-900 hover:from-black hover:to-rose-900 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg focus-ring cursor-pointer"
          >
            <Check className="w-4 h-4 text-pink-300" />
            <span>That’s me</span>
          </button>

          <button
            type="button"
            onClick={onReject}
            className="w-full sm:w-auto min-w-[140px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 font-medium text-sm transition-all focus-ring cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500" />
            <span>Go back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
