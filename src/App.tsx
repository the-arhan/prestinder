import React, { useState, useEffect } from 'react';
import { BackgroundMarks } from './components/BackgroundMarks';
import { HeaderBadge } from './components/HeaderBadge';
import { OpeningScreen } from './components/OpeningScreen';
import { IdentityConfirmation } from './components/IdentityConfirmation';
import { QuestionnaireScreen } from './components/QuestionnaireScreen';
import { SciFiAnalysisScreen } from './components/SciFiAnalysisScreen';
import { MatchRevealScreen } from './components/MatchRevealScreen';
import { QUESTIONS } from './data/mockData';
import type { Stage, FictionalStudent, UserAnswer } from './types';

const STORAGE_KEY_ANSWERS = 'prestinder_answers_v1';
const STORAGE_KEY_ATTEMPTS = 'prestinder_attempts_v1';
const STORAGE_KEY_STUDENT = 'prestinder_student_v1';
const STORAGE_KEY_STAGE = 'prestinder_stage_v1';

export const App: React.FC = () => {
  // Initialize state from localStorage or sensible defaults
  const [stage, setStage] = useState<Stage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STAGE);
      if (saved && ['opening', 'confirm-identity', 'questionnaire', 'scifi-analysis', 'matches', 'lockout'].includes(saved)) {
        return saved as Stage;
      }
    } catch {
      // fallback
    }
    return 'opening';
  });

  const [activeStudent, setActiveStudent] = useState<FictionalStudent | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch {
      // fallback
    }
    return 5;
  });

  const [answers, setAnswers] = useState<Record<number, UserAnswer>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANSWERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STAGE, stage);
      localStorage.setItem(STORAGE_KEY_ATTEMPTS, attemptsRemaining.toString());
      if (activeStudent) {
        localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(activeStudent));
      } else {
        localStorage.removeItem(STORAGE_KEY_STUDENT);
      }
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch (err) {
      console.warn('LocalStorage unavailable or disabled:', err);
    }
  }, [stage, attemptsRemaining, activeStudent, answers]);

  // Attempt deduction
  const handleAttemptUsed = () => {
    setAttemptsRemaining((prev) => {
      const next = Math.max(0, prev - 1);
      return next;
    });
  };

  // Valid ID submitted
  const handleValidIdSubmitted = (student: FictionalStudent) => {
    setActiveStudent(student);
    setStage('confirm-identity');
  };

  // Confirm Identity ('That's me')
  const handleConfirmIdentity = () => {
    setStage('questionnaire');
    setCurrentQuestionIndex(0);
  };

  // Reject Identity ('Go back')
  const handleRejectIdentity = () => {
    setActiveStudent(null);
    setStage('opening');
  };

  // Questionnaire navigation & answer saving
  const handleSaveAnswerAndNavigate = (answer: UserAnswer, nextIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [answer.questionId]: answer,
    }));
    setCurrentQuestionIndex(nextIndex);
  };

  // Final question completed
  const handleQuestionnaireComplete = (finalAnswer: UserAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [finalAnswer.questionId]: finalAnswer,
    }));
    setStage('scifi-analysis');
  };

  // Reset entire demo prototype
  const handleResetDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_STAGE);
      localStorage.removeItem(STORAGE_KEY_ATTEMPTS);
      localStorage.removeItem(STORAGE_KEY_STUDENT);
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
    } catch {
      // ignore
    }
    setAnswers({});
    setActiveStudent(null);
    setAttemptsRemaining(5);
    setCurrentQuestionIndex(0);
    setStage('opening');
  };

  const answerList = Object.values(answers);

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-rose-200 selection:text-rose-950 font-sans text-stone-800">
      {/* 
        Background Visual Layer:
        Warm ivory/white background with bold baby-pink lines sweeping diagonally 
        and irregularly across the canvas like expressive hand-drawn marks.
      */}
      <BackgroundMarks />

      {/* Top Demo Safety & Status Header */}
      <HeaderBadge
        onReset={handleResetDemo}
        showResetButton={stage !== 'opening'}
      />

      {/* Main Content Area: Centered, softly shadowed borderless panel */}
      <main className="relative z-10 flex-1 flex flex-col justify-center w-full">
        {/* Stage 1: Opening & ID Gate */}
        {stage === 'opening' && (
          <OpeningScreen
            onValidIdSubmitted={handleValidIdSubmitted}
            attemptsRemaining={attemptsRemaining}
            onAttemptUsed={handleAttemptUsed}
            onResetDemo={handleResetDemo}
            hasExistingProgress={attemptsRemaining < 5 || Object.keys(answers).length > 0}
          />
        )}

        {/* Stage 2: Identity Confirmation */}
        {stage === 'confirm-identity' && activeStudent && (
          <IdentityConfirmation
            student={activeStudent}
            onConfirm={handleConfirmIdentity}
            onReject={handleRejectIdentity}
          />
        )}

        {/* Stage 3: Questionnaire (Strictly One Question Per Screen) */}
        {stage === 'questionnaire' && (
          <QuestionnaireScreen
            questions={QUESTIONS}
            currentIndex={currentQuestionIndex}
            currentAnswer={answers[QUESTIONS[currentQuestionIndex].id]}
            onSaveAnswerAndNavigate={handleSaveAnswerAndNavigate}
            onComplete={handleQuestionnaireComplete}
            onBackToStart={() => setStage('confirm-identity')}
          />
        )}

        {/* Stage 4: Sci-Fi Wavelength Scan Analysis */}
        {stage === 'scifi-analysis' && (
          <SciFiAnalysisScreen
            userAnswers={answerList}
            onAnalysisComplete={() => setStage('matches')}
          />
        )}

        {/* Stage 5: Five Editorial Match Cards & Discovery */}
        {stage === 'matches' && (
          <MatchRevealScreen
            userAnswers={answerList}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      {/* Subtle Accessible Footer Notice */}
      <footer className="relative z-10 py-3 text-center text-[11px] text-stone-500 font-normal">
        <p>
          Prestinder Prototype • Fictional Demo Only • Strictly No Real Student Data
        </p>
      </footer>
    </div>
  );
};

export default App;
