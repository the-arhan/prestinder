import { useState, useEffect } from 'react';
import type { UserAnswer, MatchScoreResult } from '../types';
import { calculateDemoMatches, QUESTION_OF_THE_DAY } from '../data/mockData';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
  Radio,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Hash,
  Send,
  Zap,
} from 'lucide-react';

interface MatchRevealScreenProps {
  userAnswers: UserAnswer[];
  onResetDemo: () => void;
}

// Gentle once-only score count-up component
const CountUpPercent: React.FC<{ target: number }> = ({ target }) => {
  const [val, setVal] = useState(Math.max(60, target - 18));

  useEffect(() => {
    let current = Math.max(60, target - 18);
    const step = () => {
      current += 1;
      if (current <= target) {
        setVal(current);
        requestAnimationFrame(step);
      }
    };
    const anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [target]);

  return <>{val}%</>;
};

// Abstract geometric monogram sigil generator
const MatchSigil: React.FC<{ name: string; archetype: string; index: number }> = ({ name, index }) => {
  const initial = name.charAt(0);
  const colorSchemes = [
    { bg: 'from-pink-500 to-rose-700', ring: '#f472b6', text: '#ffffff' },
    { bg: 'from-purple-600 to-plum-900', ring: '#c084fc', text: '#ffffff' },
    { bg: 'from-rose-800 to-stone-900', ring: '#fda4af', text: '#ffffff' },
    { bg: 'from-pink-600 to-purple-800', ring: '#e9d5ff', text: '#ffffff' },
    { bg: 'from-stone-800 to-rose-950', ring: '#f9a8d4', text: '#ffffff' },
  ];
  const scheme = colorSchemes[index % colorSchemes.length];

  return (
    <div className="relative w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-sm select-none"
      style={{
        background: index % 2 === 0
          ? 'linear-gradient(135deg, #881337 0%, #4c0519 100%)'
          : 'linear-gradient(135deg, #701a75 0%, #2b1822 100%)',
        border: `1.5px solid ${scheme.ring}`,
      }}
    >
      {/* Delicate orbit ring */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
      />
      <span className="font-bold text-sm tracking-wider text-white font-mono">
        {initial}
      </span>
    </div>
  );
};

export const MatchRevealScreen: React.FC<MatchRevealScreenProps> = ({
  userAnswers,
  onResetDemo,
}) => {
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [qotdResponse, setQotdResponse] = useState('');
  const [qotdSubmitted, setQotdSubmitted] = useState(false);
  const [rotationFlash, setRotationFlash] = useState(false);

  // Compute the top 5 matches dynamically based on current day rotation offset
  const matches: MatchScoreResult[] = calculateDemoMatches(userAnswers, dayOffset);

  const toggleExpand = (matchId: string) => {
    setExpandedMatchId((prev) => (prev === matchId ? null : matchId));
  };

  const handleRotationChange = (offset: number) => {
    setDayOffset(offset);
    setRotationFlash(true);
    setTimeout(() => setRotationFlash(false), 380);
  };

  const handleQotdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (qotdResponse.trim().length > 0) {
      setQotdSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-10 motion-reveal">
      
      {/* Editorial Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-xs text-rose-900 font-semibold shadow-2xs">
          <Radio className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
          <span>Wavelength Overlap Confirmed</span>
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
            letterSpacing: '-0.035em',
          }}
        >
          Your wavelength overlaps
        </h1>

        <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Your matches can shift each day as more people join in.
        </p>

        {/* Demo Rotation Simulator Control */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="p-3.5 rounded-2xl paper-invitation flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-950">
                <Calendar className="w-3.5 h-3.5 text-pink-600" />
                <span>Demo rotation</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Simulate how daily matchmaking shifts over time without real student signups.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => handleRotationChange(0)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dayOffset === 0
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleRotationChange(1)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dayOffset === 1
                    ? 'bg-rose-900 text-white shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Tomorrow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Distinctive Editorial Match Cards (Not a swipe deck!) */}
      <div
        className={`space-y-5 transition-opacity duration-300 ${
          rotationFlash ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'
        }`}
        role="feed"
        aria-label="Fictional match cards"
      >
        {matches.map(({ match, percentage, sharedReasons, overlapBreakdown, evaluatedCategoriesCount }, idx) => {
          const isExpanded = expandedMatchId === match.id;

          return (
            <article
              key={match.id}
              style={{ animationDelay: `${idx * 80}ms` }}
              className="paper-invitation p-6 sm:p-7 transition-all duration-300 relative text-stone-800 motion-reveal hover:shadow-lift"
            >
              {/* Subtle top background diagonal mark accent */}
              <div
                className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-25"
                style={{
                  background: 'radial-gradient(circle at top right, #f472b6 0%, transparent 70%)',
                }}
              />

              {/* Card Header: Geometric Sigil, Identity & Overlap Percentage */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <MatchSigil name={match.name} archetype={match.archetype} index={idx} />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold tracking-tight text-stone-900">
                        {match.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 font-mono text-[11px] text-stone-600 border border-stone-200/80 font-medium">
                        {match.maskedId}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-pink-700 tracking-wide uppercase">
                      {match.archetype}
                    </p>
                  </div>
                </div>

                {/* Overlap Score Badge with Animated Count-Up */}
                <div className="text-right shrink-0">
                  <div className="inline-flex items-baseline gap-1 px-3 py-1.5 rounded-2xl bg-rose-50/90 border border-rose-200/80 text-rose-950 shadow-2xs">
                    <span className="text-xl font-extrabold font-mono tracking-tight text-rose-900">
                      <CountUpPercent target={percentage} />
                    </span>
                    <span className="text-[10px] uppercase font-bold text-pink-600">
                      overlap
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1 font-medium">
                    Evaluated from {evaluatedCategoriesCount} category overlaps
                  </p>
                </div>
              </div>

              {/* Persona Bio with Hand-drawn Placed Accent */}
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-4 border-l-2 border-rose-300 pl-3">
                “{match.bio}”
              </p>

              {/* Shared Answer Reasons (2-3 items) */}
              <div className="space-y-2 mb-4 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200/70">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  <span>Observed Resonances</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {sharedReasons.map((reason, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fictional Interest Tags with Slight Stagger */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {match.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-rose-200/70 text-[11px] font-medium text-stone-600 shadow-2xs hover:border-pink-300 transition-colors"
                  >
                    <Hash className="w-2.5 h-2.5 text-pink-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Why This Match? Inline Accordion Breakdown */}
              <div className="pt-2 border-t border-rose-100/80">
                <button
                  type="button"
                  onClick={() => toggleExpand(match.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold text-rose-950 hover:text-pink-700 transition-colors cursor-pointer group"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-pink-600 group-hover:rotate-12 transition-transform" />
                    <span>Why this match? (Detailed overlap breakdown)</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  )}
                </button>

                <div className={`expandable-panel ${isExpanded ? 'is-expanded' : ''}`}>
                  <div className="expandable-content pt-3 space-y-3 text-xs border-t border-stone-100">
                    <p className="text-[11px] text-stone-500">
                      Comparison computed directly between your provided transmission answers and this fictional persona:
                    </p>

                    <div className="space-y-2.5">
                      {overlapBreakdown.length > 0 ? (
                        overlapBreakdown.map((item, obIdx) => (
                          <div
                            key={obIdx}
                            className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/70 space-y-1.5 text-left"
                          >
                            <p className="font-semibold text-stone-800 text-xs">
                              {item.questionTitle}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              <div>
                                <span className="text-stone-500">You selected: </span>
                                <span className="font-semibold text-stone-800">
                                  {item.userAnswer}
                                </span>
                              </div>
                              <div>
                                <span className="text-stone-500">{match.name}: </span>
                                <span className="font-semibold text-rose-900">
                                  {item.matchAnswer}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-pink-700 font-semibold italic flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5 text-pink-500" />
                              <span>{item.resonanceNote}</span>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-stone-500 italic p-2 bg-stone-50 rounded-lg">
                          Playful general compatibility matrix based on group pacing preferences.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Question of the Day Card (After the five matches) */}
      <section
        aria-label="Question of the Day"
        className="paper-invitation p-6 sm:p-7 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span>{QUESTION_OF_THE_DAY.dayLabel}</span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500 font-normal">Daily ritual</span>
        </div>

        <h3 className="text-lg font-bold text-stone-900 mb-2">
          {QUESTION_OF_THE_DAY.prompt}
        </h3>

        <p className="text-xs text-stone-500 mb-4">
          {QUESTION_OF_THE_DAY.hint}
        </p>

        {qotdSubmitted ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-xs text-rose-950 flex items-start gap-3 motion-reveal shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Transmission recorded into the campus atmosphere!</p>
              <p className="text-stone-600">
                “{qotdResponse}” — Your ritual has been added to today’s wavelength loop.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleQotdSubmit} className="space-y-3">
            <input
              type="text"
              value={qotdResponse}
              onChange={(e) => setQotdResponse(e.target.value)}
              placeholder="e.g. A midnight acoustic set near the old steps..."
              className="input-invitation text-xs"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {QUESTION_OF_THE_DAY.sampleAnswers.slice(0, 1).map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setQotdResponse(sample)}
                    className="text-[11px] font-medium text-pink-700 hover:text-pink-900 underline underline-offset-2 cursor-pointer"
                  >
                    Try sample idea
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={!qotdResponse.trim()}
                className="btn-primary text-xs py-2 px-3.5"
              >
                <span>Broadcast</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}
      </section>

      {/* How This Demo Works Explanation Card */}
      <section
        aria-label="How this demo works"
        className="bg-stone-50/90 rounded-2xl p-6 border border-stone-200/80 text-xs text-stone-600 space-y-3 text-left shadow-2xs"
      >
        <h4 className="font-bold text-stone-800 text-sm flex items-center gap-2">
          <span>How this prototype works</span>
        </h4>
        <p className="leading-relaxed">
          This is a zero-database, privacy-safe frontend prototype. All matchmaking scores, persona IDs (<code className="px-1.5 py-0.5 rounded bg-white text-pink-700 font-mono font-semibold">51110304XXX</code>), and wavelength calculations are generated locally inside your browser from bundled mock records.
        </p>
        <p className="leading-relaxed">
          No real college login systems, personal student identities, or external tracking services are contacted.
        </p>
      </section>

      {/* Bottom Reset Demo Button with Tactile Feedback */}
      <div className="pt-4 pb-8 text-center">
        <button
          type="button"
          onClick={onResetDemo}
          className="btn-secondary group text-xs py-2.5 px-5"
        >
          <RotateCcw className="w-4 h-4 text-pink-600 group-hover:-rotate-90 transition-transform duration-300" />
          <span>Reset demo & test another ID</span>
        </button>
      </div>

    </div>
  );
};
