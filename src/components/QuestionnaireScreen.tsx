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
  const [navDirection, setNavDirection] = useState<'forward' | 'backward'>('forward');

  // Sync state when currentIndex changes (moving Back/Next)
  useEffect(() => {
    setSelectedOption(currentAnswer?.selectedOption);
    setCustomAnswer(currentAnswer?.customAnswer || '');
    setIsSkipped(currentAnswer?.isSkipped || false);
  }, [currentIndex, currentAnswer]);

  // Handle standard option selection with tactile feedback
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

    setNavDirection('forward');
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

    setNavDirection('forward');
    if (currentIndex === totalQuestions - 1) {
      onComplete(compiledAnswer);
    } else {
      onSaveAnswerAndNavigate(compiledAnswer, currentIndex + 1);
    }
  };

  // Handle Back action
  const handleBack = () => {
    const draftAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption,
      customAnswer: customAnswer.trim() || undefined,
      isSkipped,
    };

    setNavDirection('backward');
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
      <div className="w-full paper-invitation p-6 sm:p-9 transition-all duration-300">
        
        {/* 1. Progress Label and Slim Glowing Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-stone-500">
            <span className="text-stone-700 tracking-wide font-semibold">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-pink-700 font-mono text-[11px] font-bold">
              {Math.round(progressPercent)}%
            </span>
          </div>

          <div
            className="progress-rail"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
          >
            <div
              className="progress-track-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Directional Transition Wrapper for Question & Options */}
        <div
          key={`question-${currentQuestion.id}`}
          className={navDirection === 'forward' ? 'slide-in-right' : 'slide-in-left'}
        >
          {/* 2. Short Question (kept to two lines or fewer on phone) */}
          <h2
            className="text-lg sm:text-xl font-bold text-stone-900 leading-snug tracking-tight mb-5 min-h-[3.25rem] flex items-center"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {currentQuestion.prompt}
          </h2>

          {/* 3. Spacious Set of Answer Options with Staggered Visual Feel */}
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
                  className={`option-card ${isSelected ? 'is-selected' : ''}`}
                >
                  <span className="leading-snug">{option}</span>
                  <span className="option-radio-dot" aria-hidden="true">
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 4. Optional Text Field Labeled "Or write your own answer" */}
          <div className="space-y-1.5 mb-6">
            <label
              htmlFor="custom-answer-input"
              className="block text-xs font-semibold text-stone-700"
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
                className={`input-invitation ${
                  customAnswer.trim().length > 0 ? 'border-pink-400! bg-rose-50/50!' : ''
                }`}
              />
              {customAnswer.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setCustomAnswer('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 transition-colors"
                  title="Clear custom answer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 5. Back, Skip, Next Buttons at Bottom with Tactile Feedback */}
        <div className="pt-3 border-t border-rose-100/80 flex items-center justify-between gap-2">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="btn-secondary text-xs py-2 px-3.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {/* Secondary Action: Skip with Deliberate Underline Effect */}
          <button
            type="button"
            onClick={handleSkip}
            className="px-3 py-1.5 text-stone-500 hover:text-stone-900 text-xs font-medium underline underline-offset-4 decoration-rose-300 hover:decoration-rose-600 transition-all cursor-pointer"
          >
            Skip
          </button>

          {/* Next / Finish Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasValidSelection}
            className="btn-primary text-xs py-2.5 px-4.5"
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Analyze Transmission' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
