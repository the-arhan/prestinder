export interface Question {
  id: number;
  prompt: string;
  options: string[];
}

export interface UserAnswer {
  questionId: number;
  selectedOption?: string;
  customAnswer?: string;
  isSkipped?: boolean;
}

export interface FictionalStudent {
  id: string; // e.g., '51110307042'
  name: string;
  maskedId: string;
}

export interface FictionalMatch {
  id: string;
  name: string;
  maskedId: string;
  avatarSeed: string;
  archetype: string;
  tags: string[];
  basePercentage: number;
  answers: Record<number, string>;
  bio: string;
}

export interface MatchScoreResult {
  match: FictionalMatch;
  percentage: number;
  sharedReasons: string[];
  overlapBreakdown: {
    questionTitle: string;
    userAnswer: string;
    matchAnswer: string;
    resonanceNote: string;
  }[];
  evaluatedCategoriesCount: number;
}

export type Stage =
  | 'opening'
  | 'id-gate'
  | 'confirm-identity'
  | 'questionnaire'
  | 'scifi-analysis'
  | 'matches'
  | 'lockout';
