import { useState, useEffect, useRef } from 'react';
import { DEMO_PRIMARY_ID, FICTIONAL_STUDENTS } from '../data/mockData';
import type { FictionalStudent } from '../types';
import { ArrowRight, AlertCircle, Sparkles, RotateCcw, Compass } from 'lucide-react';

interface OpeningScreenProps {
  onValidIdSubmitted: (student: FictionalStudent) => void;
  attemptsRemaining: number;
  onAttemptUsed: () => void;
  onResetDemo: () => void;
  hasExistingProgress?: boolean;
}

type InvalidActionType = 'idle' | 'new' | 'lost' | 'not-from-college';

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onValidIdSubmitted,
  attemptsRemaining,
  onAttemptUsed,
  onResetDemo,
  hasExistingProgress = false,
}) => {
  // Phase 1: wordmark fade-in, Phase 2: panel settles upward and reveals form
  const [hasSettled, setHasSettled] = useState(hasExistingProgress);
  const [inputId, setInputId] = useState('');
  const [invalidMessage, setInvalidMessage] = useState(false);
  const [invalidAction, setInvalidAction] = useState<InvalidActionType>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Cinematic sequence timer (fast forward if returning visitor)
  useEffect(() => {
    if (hasExistingProgress) {
      setHasSettled(true);
      return;
    }
    const timer = setTimeout(() => {
      setHasSettled(true);
    }, 1250);
    return () => clearTimeout(timer);
  }, [hasExistingProgress]);

  // Autofocus input once settled
  useEffect(() => {
    if (hasSettled && attemptsRemaining > 0) {
      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
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
      // Valid fictional ID -> trigger paper scattering dissolve transition
      setInvalidMessage(false);
      setInvalidAction('idle');
      setIsDissolving(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onValidIdSubmitted(match);
      }, 420);
    } else {
      // Invalid ID -> playful side-to-side nudge
      setIsSubmitting(false);
      onAttemptUsed();
      setInvalidMessage(true);
      setInvalidAction('idle');
      setIsNudging(true);
      setTimeout(() => setIsNudging(false), 450);
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
      <div className="w-full max-w-lg mx-auto px-4 py-8 motion-reveal text-center">
        <div className="paper-invitation p-8 sm:p-10 space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-900 shadow-sm">
            <AlertCircle className="w-7 h-7 text-rose-700" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Demo Lockout
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
              You’ve reached the 5-attempt boundary of this fictional transmission prototype.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-xs text-stone-600 text-left space-y-1">
            <p className="font-semibold text-rose-950 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-pink-600" />
              <span>Prototype Boundary Notice</span>
            </p>
            <p>
              This is simulated prototype behavior stored locally in your browser session. No network lock or device ban exists.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onResetDemo}
              className="btn-primary w-full sm:w-auto"
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
      {/* Floating Paper Invitation Panel */}
      <div
        className={`w-full paper-invitation p-7 sm:p-10 text-center transition-all duration-700 ease-out ${
          isDissolving ? 'motion-dissolve-out' : ''
        } ${isNudging ? 'nudge-playful' : ''} ${
          hasSettled ? 'translate-y-0 opacity-100 motion-float' : 'translate-y-4 opacity-95'
        }`}
      >
        {/* Wordmark and Tagline with Ceremonial Cinematic Sequence */}
        <div className="space-y-3 mb-8">
          <h1
            className={`text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 ${
              hasExistingProgress ? '' : 'wordmark-animated'
            }`}
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            <span className="bg-gradient-to-r from-stone-900 via-rose-950 to-pink-700 bg-clip-text text-transparent">
              Prestinder
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base text-rose-900/85 font-normal tracking-wide ${
              hasExistingProgress ? '' : 'tagline-animated'
            }`}
          >
            Why have fun alone when you can share it?
          </p>
        </div>

        {/* Panel Reveal: Form Section */}
        <div
          className={`transition-all duration-500 ease-out ${
            hasSettled
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="college-login-id"
                  className="font-medium text-stone-800 flex items-center gap-1.5"
                >
                  <span>Enter your college login ID</span>
                </label>

                {/* Subtle count transition pill */}
                <span className="text-[11px] font-medium text-rose-900 bg-rose-50/90 px-2.5 py-0.5 rounded-full border border-rose-200/70 transition-all duration-200 shadow-2xs">
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
                  className="input-invitation font-mono"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between pt-0.5 text-[11px]">
                <p className="text-stone-500">
                  Prototype demo — use a fictional ID
                </p>
                <button
                  type="button"
                  onClick={handleUseDemoId}
                  className="font-medium text-pink-700 hover:text-pink-900 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Use sample ID (51110307042)
                </button>
              </div>
            </div>

            {/* Invalid ID Notification Box with Conversational Stagger */}
            {invalidMessage && (
              <div className="rounded-2xl bg-rose-50/90 border border-rose-200 p-4 space-y-3 motion-reveal shadow-xs">
                <p className="text-xs font-semibold text-rose-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  <span>You’re either new, a little lost, or not from this college.</span>
                </p>

                {/* Conversational Staggered Action Buttons */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setInvalidAction('new')}
                    style={{ animationDelay: '50ms' }}
                    className={`btn-secondary text-xs py-1.5 px-3 rounded-xl transition-all ${
                      invalidAction === 'new'
                        ? 'bg-rose-900! text-white! border-rose-900! shadow-xs'
                        : ''
                    }`}
                  >
                    I’m new
                  </button>

                  <button
                    type="button"
                    onClick={handleLostFocus}
                    style={{ animationDelay: '100ms' }}
                    className="btn-secondary text-xs py-1.5 px-3 rounded-xl transition-all"
                  >
                    I’m lost
                  </button>

                  <button
                    type="button"
                    onClick={() => setInvalidAction('not-from-college')}
                    style={{ animationDelay: '150ms' }}
                    className={`btn-secondary text-xs py-1.5 px-3 rounded-xl transition-all ${
                      invalidAction === 'not-from-college'
                        ? 'bg-stone-900! text-white! border-stone-900! shadow-xs'
                        : ''
                    }`}
                  >
                    Not from this college
                  </button>
                </div>

                {/* Sub-actions with gentle fade and lift */}
                {invalidAction === 'new' && (
                  <div className="mt-2 p-3 rounded-xl bg-white border border-rose-200/80 text-xs text-stone-700 space-y-2 motion-reveal shadow-2xs">
                    <p>
                      Welcome to the experiment! Because no real credentials or student lists are ever accessed, try this bundled demo ID:
                    </p>
                    <div className="flex items-center justify-between bg-rose-50/80 px-3 py-1.5 rounded-lg border border-rose-200/60">
                      <code className="font-mono font-bold text-rose-950">{DEMO_PRIMARY_ID}</code>
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
                  <div className="mt-2 p-3 rounded-xl bg-white border border-rose-200/80 text-xs text-stone-700 space-y-2 motion-reveal shadow-2xs">
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

            {/* Tactile Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!inputId.trim() || isSubmitting}
                className="btn-primary w-full"
              >
                <span>Continue to Experiment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Helper Badge */}
          <div className="mt-6 pt-5 border-t border-rose-100/70 flex items-center justify-center gap-2 text-[11px] text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Fictional sample IDs:</span>
            <code className="text-rose-900 font-mono font-semibold">51110307042</code>
            <span className="text-stone-300">•</span>
            <code className="text-rose-900 font-mono font-semibold">51110304918</code>
          </div>
        </div>
      </div>
    </div>
  );
};
