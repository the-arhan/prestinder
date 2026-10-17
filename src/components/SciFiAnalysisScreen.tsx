import { useEffect, useState, useMemo } from 'react';
import type { UserAnswer } from '../types';
import { Sparkles, Activity, Radio, Compass, ArrowRight, Zap } from 'lucide-react';

interface SciFiAnalysisScreenProps {
  userAnswers: UserAnswer[];
  onAnalysisComplete: () => void;
}

export const SciFiAnalysisScreen: React.FC<SciFiAnalysisScreenProps> = ({
  userAnswers,
  onAnalysisComplete,
}) => {
  const [scanProgress, setScanProgress] = useState(16);
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
    const q1 = userAnswers.find((a) => a.questionId === 1);
    const q1Val = q1?.selectedOption || q1?.customAnswer || 'General';

    const q2 = userAnswers.find((a) => a.questionId === 2);
    const q2Val = q2?.selectedOption || q2?.customAnswer || 'Eclectic';

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

  // Smooth progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 7;
      });
    }, 170);

    return () => clearInterval(interval);
  }, []);

  // Update status messages
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setStatusMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 750);

    return () => clearInterval(msgInterval);
  }, [statusMessages.length]);

  // Auto-transition when progress completes
  useEffect(() => {
    if (scanProgress >= 100) {
      const finishTimer = setTimeout(() => {
        onAnalysisComplete();
      }, 550);
      return () => clearTimeout(finishTimer);
    }
  }, [scanProgress, onAnalysisComplete]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[78vh]">
      {/* Visual Centerpiece: Secret Science Fair Instrument */}
      <div className="w-full paper-invitation p-7 sm:p-10 text-center space-y-7 motion-reveal"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, #fff8fc 50%, #faf3f8 100%)',
        }}
      >
        
        {/* Subtle Science Fair Instrument Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50/90 border border-purple-200/70 text-xs text-purple-900 font-semibold shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
          <span>Wavelength Resonance Instrument</span>
        </div>

        {/* Central Celestial Orbit & Waveform Animation */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
          
          {/* Outer Delicate Orbit Arc with Tick Marks */}
          <div className="absolute inset-0 rounded-full border border-dashed border-pink-300/70 orbit-slow" />
          
          {/* Middle Counter-rotating Frequency Ring with Lavender Accents */}
          <div className="absolute inset-4 rounded-full border border-purple-300/50 border-t-pink-500 border-b-purple-600 orbit-reverse" />

          {/* Third Nested Geometric Ring */}
          <div className="absolute inset-8 rounded-full border border-pink-200/60 border-l-rose-500 orbit-fast" />

          {/* Central Pulsating Waveform Signal */}
          <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-rose-50 via-white to-purple-50 border border-pink-200 flex items-center justify-center shadow-md waveform-pulse">
            <Radio className="w-9 h-9 text-rose-950" />
          </div>

          {/* Secret Science Fair Celestial Node Glints */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] glint-sparkle" />
          <div className="absolute bottom-4 right-8 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_#c084fc]" />
          <div className="absolute top-10 left-4 w-1.5 h-1.5 rounded-full bg-rose-700 shadow-[0_0_6px_#be123c]" />

          {/* Live Progress Tag */}
          <div className="absolute -bottom-2 px-3.5 py-0.5 rounded-full bg-stone-900 text-white font-mono text-[11px] shadow-sm tracking-widest font-semibold">
            {scanProgress}% SCANNED
          </div>
        </div>

        {/* Status Transmission Readout */}
        <div className="space-y-1.5">
          <h2
            className="text-2xl font-bold tracking-tight text-stone-900"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.025em',
            }}
          >
            Scanning Resonance Frequencies
          </h2>
          <p className="text-xs font-mono text-pink-700 animate-pulse min-h-[1.5rem]">
            {statusMessages[statusMessageIndex]}
          </p>
        </div>

        {/* Playful Readouts based on demo answers (Staggered Appearance) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-white/90 border border-rose-100 shadow-2xs space-y-1 hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
              <Activity className="w-3.5 h-3.5 text-pink-600" />
              <span>Midnight Curiosity</span>
            </div>
            <p className="text-sm font-bold font-mono text-stone-900">
              {metrics.midnightCuriosity}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-rose-100 shadow-2xs space-y-1 hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Spontaneity Signal</span>
            </div>
            <p className="text-sm font-bold font-mono text-stone-900">
              {metrics.spontaneitySignal}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-rose-100 shadow-2xs space-y-1 hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
              <Compass className="w-3.5 h-3.5 text-rose-800" />
              <span>Comfort Frequency</span>
            </div>
            <p className="text-sm font-bold font-mono text-stone-900">
              {metrics.comfortFrequency}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/90 border border-rose-100 shadow-2xs space-y-1 hover:border-rose-200 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
              <Radio className="w-3.5 h-3.5 text-purple-700" />
              <span>Acoustic Bias</span>
            </div>
            <p className="text-sm font-bold font-mono text-stone-900 truncate">
              {metrics.acousticTone}
            </p>
          </div>
        </div>

        {/* Required Note */}
        <p className="text-[11px] text-stone-500 italic max-w-md mx-auto leading-normal">
          A playful reflection of your selected answers — not a personality test.
        </p>

        {/* Non-blocking skip/continue action immediately accessible */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onAnalysisComplete}
            className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5"
          >
            <span>Skip scan and view matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
