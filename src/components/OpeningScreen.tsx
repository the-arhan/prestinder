import { useState, useEffect, useRef } from 'react';
import { DEMO_PRIMARY_ID, FICTIONAL_STUDENTS } from '../data/mockData';
import type { FictionalStudent } from '../types';
import { ArrowRight, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';

interface OpeningScreenProps {
  onValidIdSubmitted: (student: FictionalStudent) => void;
  attemptsRemaining: number;
  onAttemptUsed: () => void;
  onResetDemo: () => void;
}

type InvalidActionType = 'idle' | 'new' | 'lost' | 'not-from-college';

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onValidIdSubmitted,
  attemptsRemaining,
  onAttemptUsed,
  onResetDemo,
}) => {
  // Phase 1: wordmark fade-in, Phase 2: panel settles upward and reveals form
  const [hasSettled, setHasSettled] = useState(false);
  const [inputId, setInputId] = useState('');
  const [invalidMessage, setInvalidMessage] = useState(false);
  const [invalidAction, setInvalidAction] = useState<InvalidActionType>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Slow wordmark fade-in and settling timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSettled(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // Autofocus input once settled
  useEffect(() => {
    if (hasSettled && attemptsRemaining > 0) {
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(focusTimer);
    }
  }, [hasSettled, attemptsRemaining]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (attemptsRemaining <= 0 || isSubmitting) return;

    const trimmed = inputId.trim();
    if (!trimmed) return;

    setIsSubmitting(true);

    // Check against bundled fictional student accounts
    const match = FICTIONAL_STUDENTS.find(
      (s) => s.id.toLowerCase() === trimmed.toLowerCase()
    );

    if (match) {
      // Valid fictional ID
      setInvalidMessage(false);
      setInvalidAction('idle');
      setTimeout(() => {
        setIsSubmitting(false);
        onValidIdSubmitted(match);
      }, 250);
    } else {
      // Invalid ID
      setIsSubmitting(false);
      onAttemptUsed();
      setInvalidMessage(true);
      setInvalidAction('idle');
    }
  };

  const handleUseDemoId = () => {
    setInputId(DEMO_PRIMARY_ID);
    setInvalidMessage(false);
    setInvalidAction('idle');
    inputRef.current?.focus();
  };

  const handleLostFocus = () => {
    setInvalidAction('idle');
    inputRef.current?.focus();
  };

  // If locked out (0 attempts)
  if (attemptsRemaining <= 0) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-8 animate-fade-in text-center">
        <div className="bg-white/95 rounded-3xl p-8 sm:p-10 shadow-2xl border border-rose-100 text-stone-800 space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-900">
            <AlertCircle className="w-7 h-7 text-rose-700" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Demo Lockout
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
              You’ve exhausted all 5 fictional prototype ID attempts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 text-xs text-stone-600 text-left space-y-1">
            <p className="font-medium text-rose-950">Prototype notice:</p>
            <p>
              This is simulated prototype behavior stored in your browser session only. It is not a real device ban.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onResetDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 hover:from-rose-950 hover:to-pink-950 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg focus-ring cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset demo & restore attempts</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Centered softly shadowed panel */}
      <div
        className={`w-full bg-white/95 rounded-3xl p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(136,19,55,0.09),0_10px_25px_-5px_rgba(0,0,0,0.03)] border border-rose-100/70 transition-all duration-700 ease-out text-center ${
          hasSettled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
        }`}
      >
        {/* Wordmark and Tagline */}
        <div className="space-y-3 mb-8">
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 transition-opacity duration-1000"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            <span className="bg-gradient-to-r from-stone-900 via-rose-950 to-pink-800 bg-clip-text text-transparent">
              Prestinder
            </span>
          </h1>

          <p className="text-sm sm:text-base text-rose-900/80 font-normal tracking-wide">
            Why have fun alone when you can share it?
          </p>
        </div>

        {/* Panel Reveal: Form Section */}
        <div
          className={`transition-all duration-700 delay-150 ${
            hasSettled
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="college-login-id"
                  className="font-medium text-stone-700"
                >
                  Enter your college login ID
                </label>
                <span className="text-[11px] font-medium text-rose-700/80 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/50">
                  {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
                </span>
              </div>

              <div className="relative">
                <input
                  id="college-login-id"
                  ref={inputRef}
                  type="text"
                  value={inputId}
                  onChange={(e) => {
                    setInputId(e.target.value);
                    if (invalidMessage) setInvalidMessage(false);
                  }}
                  placeholder="For example, 51110307XXX"
                  className="w-full px-4 py-3.5 rounded-2xl bg-stone-50/70 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-rose-400 text-sm font-medium transition-colors shadow-2xs focus-ring"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <p className="text-[11px] text-stone-500">
                  Prototype demo — use a fictional ID
                </p>
                <button
                  type="button"
                  onClick={handleUseDemoId}
                  className="text-[11px] font-medium text-pink-700 hover:text-pink-900 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Use sample ID (51110307042)
                </button>
              </div>
            </div>

            {/* Invalid ID Notification Box */}
            {invalidMessage && (
              <div className="rounded-2xl bg-rose-50/80 border border-rose-200/80 p-4 space-y-3 animate-fade-in">
                <p className="text-xs font-medium text-rose-950">
                  You’re either new, a little lost, or not from this college.
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setInvalidAction('new')}
                    className={`px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer ${
                      invalidAction === 'new'
                        ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                        : 'bg-white hover:bg-rose-100/70 text-rose-900 border-rose-200'
                    }`}
                  >
                    I’m new
                  </button>

                  <button
                    type="button"
                    onClick={handleLostFocus}
                    className="px-3 py-1.5 rounded-xl border bg-white hover:bg-rose-100/70 text-rose-900 border-rose-200 font-medium transition-all cursor-pointer"
                  >
                    I’m lost
                  </button>

                  <button
                    type="button"
                    onClick={() => setInvalidAction('not-from-college')}
                    className={`px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer ${
                      invalidAction === 'not-from-college'
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    Not from this college
                  </button>
                </div>

                {/* Sub-actions based on selection */}
                {invalidAction === 'new' && (
                  <div className="mt-2 p-3 rounded-xl bg-white border border-rose-100 text-xs text-stone-700 space-y-2 animate-fade-in">
                    <p>
                      Welcome to the demo! Because real student accounts are never accessed, please test with bundled fictional ID:
                    </p>
                    <div className="flex items-center justify-between bg-rose-50/60 px-3 py-1.5 rounded-lg border border-rose-200/50">
                      <code className="font-mono font-bold text-rose-900">{DEMO_PRIMARY_ID}</code>
                      <button
                        type="button"
                        onClick={handleUseDemoId}
                        className="text-[11px] font-semibold text-pink-700 hover:text-pink-900 transition-colors"
                      >
                        Auto-fill this ID
                      </button>
                    </div>
                  </div>
                )}

                {invalidAction === 'not-from-college' && (
                  <div className="mt-2 p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 space-y-2 animate-fade-in">
                    <p className="italic text-stone-800">
                      “You can try again next year. Until then, keep an eye out for your people.”
                    </p>
                    <button
                      type="button"
                      onClick={handleUseDemoId}
                      className="text-[11px] font-medium text-pink-700 hover:text-pink-900 underline underline-offset-2"
                    >
                      Or explore the demo anyway as a campus guest
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!inputId.trim() || isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-stone-900 via-rose-950 to-pink-900 hover:from-black hover:to-rose-900 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-ring"
              >
                <span>Continue to Experiment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Helper Pill */}
          <div className="mt-6 pt-5 border-t border-rose-100/60 flex items-center justify-center gap-2 text-[11px] text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Fictional sample IDs:</span>
            <code className="text-rose-900 font-mono font-medium">51110307042</code>
            <span className="text-stone-300">•</span>
            <code className="text-rose-900 font-mono font-medium">51110304918</code>
          </div>
        </div>
      </div>
    </div>
  );
};
