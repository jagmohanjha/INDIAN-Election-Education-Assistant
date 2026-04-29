// User data types
export interface UserData {
  age: number;
  citizenship: string;
  residenceState: string;
  residenceDistrict: string;
  name: string;
  hasVoterId: boolean;
}

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  nextSteps: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizScore {
  userId: string;
  score: number;
  totalQuestions: number;
  date: string;
  answers: number[];
}

export interface TimelineEvent {
  phase: string;
  description: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
