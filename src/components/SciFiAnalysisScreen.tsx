import { useEffect, useState, useMemo } from 'react';
import type { UserAnswer } from '../types';
import { Sparkles, Activity, Radio, Compass, ArrowRight } from 'lucide-react';

interface SciFiAnalysisScreenProps {
  userAnswers: UserAnswer[];
  onAnalysisComplete: () => void;
}

export const SciFiAnalysisScreen: React.FC<SciFiAnalysisScreenProps> = ({
  userAnswers,
  onAnalysisComplete,
}) => {
  const [scanProgress, setScanProgress] = useState(12);
  const [statusMessageIndex, setStatusMessageIndex] = useState(0);

  const statusMessages = useMemo(
    () => [
      'Calibrating acoustic spectrum & harmonics...',
      'Synthesizing temporal pacing frequencies...',
      'Mapping comfort threshold coordinates...',
      'Harmonizing playful compatibility vectors...',
      'Finalizing wavelength overlap matrix...',
    ],
    []
  );

  // Playfully derive metrics from user answers
  const metrics = useMemo(() => {
    // Find answer to question 1 (evening)
    const q1 = userAnswers.find((a) => a.questionId === 1);
    const q1Val = q1?.selectedOption || q1?.customAnswer || 'General';

    // Find answer to question 2 (music)
    const q2 = userAnswers.find((a) => a.questionId === 2);
    const q2Val = q2?.selectedOption || q2?.customAnswer || 'Eclectic';

    // Find answer to question 4 (plans)
    const q4 = userAnswers.find((a) => a.questionId === 4);
    const isSpontaneous =
      q4?.selectedOption?.includes('spontaneous') ||
      q4?.selectedOption?.includes('loose');

    return {
      midnightCuriosity: `${(78 + (userAnswers.length * 1.5) % 18).toFixed(1)} MHz`,
      spontaneitySignal: isSpontaneous ? '94.2% High Impulse' : '88.6% Harmonic Groove',
      comfortFrequency: q1Val.includes('quiet') || q1Val.includes('book')
        ? 'Deep Sanctuary (Low Band)'
        : 'Vibrant Pulse (Mid Band)',
      acousticTone: q2Val.length > 18 ? `${q2Val.slice(0, 16)}...` : q2Val,
    };
  }, [userAnswers]);

  // Animated progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 6;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // Update status messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setStatusMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 800);

    return () => clearInterval(msgInterval);
  }, [statusMessages.length]);

  // Transition when progress hits 100% after brief pause
  useEffect(() => {
    if (scanProgress >= 100) {
      const finishTimer = setTimeout(() => {
        onAnalysisComplete();
      }, 700);
      return () => clearTimeout(finishTimer);
    }
  }, [scanProgress, onAnalysisComplete]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[78vh]">
      <div className="w-full bg-white/95 rounded-3xl p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(136,19,55,0.09),0_10px_25px_-5px_rgba(0,0,0,0.03)] border border-rose-100/70 text-center space-y-7 animate-dissolve">
        
        {/* Futuristic Abstract Scanner Animation */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto flex items-center justify-center">
          {/* Outer Orbit Line with baby-pink stroke */}
          <div className="absolute inset-0 rounded-full border border-dashed border-pink-300/60 animate-spin-slow" />

          {/* Middle Counter-rotating Frequency Ring */}
          <div className="absolute inset-4 rounded-full border border-rose-400/40 border-t-pink-500 animate-spin-reverse" />

          {/* Inner Pulsating Waveform Ring */}
          <div className="absolute inset-10 rounded-full bg-rose-50/70 border border-pink-200/80 flex items-center justify-center shadow-inner animate-pulse">
            <Radio className="w-8 h-8 text-rose-900" />
          </div>

          {/* Decorative sci-fi node dots */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
          <div className="absolute bottom-3 right-6 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]" />
          <div className="absolute top-8 left-4 w-1.5 h-1.5 rounded-full bg-rose-700 shadow-[0_0_6px_#be123c]" />

          {/* Live Progress Tag */}
          <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-stone-900 text-white font-mono text-[11px] shadow-sm tracking-wider">
            {scanProgress}% SCANNED
          </div>
        </div>

        {/* Status Transmission */}
        <div className="space-y-1.5">
          <h2
            className="text-2xl font-semibold tracking-tight text-stone-900"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Scanning Resonance Frequencies
          </h2>
          <p className="text-xs font-mono text-pink-700 animate-pulse min-h-[1.5rem]">
            {statusMessages[statusMessageIndex]}
          </p>
        </div>

        {/* Playful Readouts based on demo answers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Activity className="w-3.5 h-3.5 text-pink-600" />
              <span>Midnight Curiosity</span>
            </div>
            <p className="text-sm font-semibold font-mono text-stone-900">
              {metrics.midnightCuriosity}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Spontaneity Signal</span>
            </div>
            <p className="text-sm font-semibold font-mono text-stone-900">
              {metrics.spontaneitySignal}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Compass className="w-3.5 h-3.5 text-rose-800" />
              <span>Comfort Frequency</span>
            </div>
            <p className="text-sm font-semibold font-mono text-stone-900">
              {metrics.comfortFrequency}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
              <Radio className="w-3.5 h-3.5 text-purple-700" />
              <span>Acoustic Bias</span>
            </div>
            <p className="text-sm font-semibold font-mono text-stone-900 truncate">
              {metrics.acousticTone}
            </p>
          </div>
        </div>

        {/* Required Note */}
        <p className="text-[11px] text-stone-500 italic max-w-md mx-auto leading-normal">
          A playful reflection of your selected answers — not a personality test.
        </p>

        {/* Fast-forward action */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onAnalysisComplete}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-900 hover:text-black hover:bg-rose-50/70 rounded-xl transition-colors cursor-pointer"
          >
            <span>Skip scan and view matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
