import { useState, useEffect } from 'react';
import type { Question, UserAnswer } from '../types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface QuestionnaireScreenProps {
  questions: Question[];
  currentIndex: number;
  currentAnswer?: UserAnswer;
  onSaveAnswerAndNavigate: (answer: UserAnswer, nextIndex: number) => void;
  onComplete: (finalAnswers: UserAnswer) => void;
  onBackToStart: () => void;
}

export const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({
  questions,
  currentIndex,
  currentAnswer,
  onSaveAnswerAndNavigate,
  onComplete,
  onBackToStart,
}) => {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Local state for the current screen's answer
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    currentAnswer?.selectedOption
  );
  const [customAnswer, setCustomAnswer] = useState<string>(
    currentAnswer?.customAnswer || ''
  );
  const [isSkipped, setIsSkipped] = useState<boolean>(
    currentAnswer?.isSkipped || false
  );

  // Sync state when currentIndex changes (moving Back/Next)
  useEffect(() => {
    setSelectedOption(currentAnswer?.selectedOption);
    setCustomAnswer(currentAnswer?.customAnswer || '');
    setIsSkipped(currentAnswer?.isSkipped || false);
  }, [currentIndex, currentAnswer]);

  // Handle standard option selection
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setCustomAnswer(''); // Choosing standard option clears custom answer
    setIsSkipped(false);
  };

  // Handle custom answer typing
  const handleCustomAnswerChange = (text: string) => {
    setCustomAnswer(text);
    if (text.trim().length > 0) {
      setSelectedOption(undefined); // Entering custom answer clears selected option
      setIsSkipped(false);
    }
  };

  // Handle Skip action
  const handleSkip = () => {
    const skippedAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: undefined,
      customAnswer: undefined,
      isSkipped: true,
    };

    if (currentIndex === totalQuestions - 1) {
      onComplete(skippedAnswer);
    } else {
      onSaveAnswerAndNavigate(skippedAnswer, currentIndex + 1);
    }
  };

  // Handle Next / Finish action
  const handleNext = () => {
    const hasSelection = Boolean(selectedOption);
    const hasCustom = customAnswer.trim().length > 0;

    if (!hasSelection && !hasCustom && !isSkipped) {
      return; // Require either an option, custom answer, or Skip
    }

    const compiledAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: hasSelection ? selectedOption : undefined,
      customAnswer: hasCustom ? customAnswer.trim() : undefined,
      isSkipped: !hasSelection && !hasCustom ? isSkipped : false,
    };

    if (currentIndex === totalQuestions - 1) {
      onComplete(compiledAnswer);
    } else {
      onSaveAnswerAndNavigate(compiledAnswer, currentIndex + 1);
    }
  };

  // Handle Back action
  const handleBack = () => {
    // Preserve current draft answer when going back
    const draftAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption,
      customAnswer: customAnswer.trim() || undefined,
      isSkipped,
    };

    if (currentIndex > 0) {
      onSaveAnswerAndNavigate(draftAnswer, currentIndex - 1);
    } else {
      onBackToStart();
    }
  };

  const hasValidSelection = Boolean(selectedOption) || customAnswer.trim().length > 0 || isSkipped;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-8 flex flex-col justify-center min-h-[82vh]">
      {/* 
        CRITICAL LAYOUT RULE:
        Centered, borderless, softly shadowed panel containing ONLY:
        1. Progress label & slim progress bar
        2. Short question (<= 2 lines on phone)
        3. Spacious set of answer options
        4. Optional text field: "Or write your own answer"
        5. Back, Skip, Next buttons
      */}
      <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-9 shadow-[0_20px_60px_-15px_rgba(136,19,55,0.08),0_10px_25px_-5px_rgba(0,0,0,0.02)] border border-rose-100/70 transition-all duration-300">
        
        {/* 1. Progress Label and Slim Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500">
            <span className="text-stone-700 tracking-wide">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-pink-700 font-mono text-[11px]">
              {Math.round(progressPercent)}%
            </span>
          </div>

          <div
            className="w-full h-1 bg-stone-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
          >
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-rose-700 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2. Short Question (kept to two lines or fewer on phone) */}
        <h2
          className="text-lg sm:text-xl font-semibold text-stone-900 leading-snug tracking-tight mb-5 min-h-[3.25rem] flex items-center"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          {currentQuestion.prompt}
        </h2>

        {/* 3. Spacious Set of Answer Options (Scrollable if needed on small phones, never crammed) */}
        <div
          className="space-y-2.5 max-h-[38vh] sm:max-h-[42vh] overflow-y-auto pr-1 custom-scrollbar mb-5"
          role="radiogroup"
          aria-label={currentQuestion.prompt}
        >
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            return (
              <button
                key={`${currentQuestion.id}-${idx}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150 flex items-center justify-between gap-3 border min-h-[46px] cursor-pointer focus-ring ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-300 text-rose-950 shadow-xs ring-1 ring-rose-300/40'
                    : 'bg-stone-50/60 hover:bg-rose-50/40 border-stone-200/70 hover:border-rose-200 text-stone-700'
                }`}
              >
                <span className="leading-snug">{option}</span>
                {isSelected && (
                  <span className="shrink-0 w-5 h-5 rounded-full bg-rose-900 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Optional Text Field Labeled "Or write your own answer" */}
        <div className="space-y-1.5 mb-6">
          <label
            htmlFor="custom-answer-input"
            className="block text-xs font-medium text-stone-600"
          >
            Or write your own answer
          </label>
          <div className="relative">
            <input
              id="custom-answer-input"
              type="text"
              value={customAnswer}
              onChange={(e) => handleCustomAnswerChange(e.target.value)}
              placeholder="Type your own perspective here..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus-ring placeholder:text-stone-400 ${
                customAnswer.trim().length > 0
                  ? 'bg-rose-50/80 border-rose-300 text-rose-950 ring-1 ring-rose-200'
                  : 'bg-stone-50/70 border-stone-200 text-stone-800'
              }`}
            />
            {customAnswer.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setCustomAnswer('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs px-1"
                title="Clear custom answer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 5. Back, Skip, Next Buttons at Bottom */}
        <div className="pt-2 border-t border-rose-100/60 flex items-center justify-between gap-2">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs transition-colors focus-ring cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {/* Secondary Action: Skip */}
          <button
            type="button"
            onClick={handleSkip}
            className="px-3 py-2 text-stone-500 hover:text-stone-800 text-xs font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-500 transition-colors cursor-pointer"
          >
            Skip
          </button>

          {/* Next / Finish Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasValidSelection}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-stone-900 via-rose-950 to-pink-900 hover:from-black hover:to-rose-900 text-white font-medium text-xs transition-all shadow-xs hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed focus-ring cursor-pointer"
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Analyze Transmission' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
