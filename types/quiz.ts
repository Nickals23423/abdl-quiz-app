export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'scale' | 'boolean';
  options?: QuizOption[];
  nextQuestion?: (answer: any) => string | null; // For branching logic
}

export interface QuizOption {
  id: string;
  text: string;
  value: any;
  emoji?: string;
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  emoji: string;
  badges?: string[];
  shareableText?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: 'personality' | 'knowledge' | 'scenario';
  questions: QuizQuestion[];
  resultCalculator: (answers: Record<string, any>) => QuizResult;
}

export interface UserAnswer {
  questionId: string;
  answer: any;
  timestamp: Date;
}

export interface QuizHistory {
  quizId: string;
  result: QuizResult;
  answers: UserAnswer[];
  completedAt: Date;
}

export interface UserProfile {
  avatar?: string;
  preferredName?: string;
  achievements: string[];
  quizHistory: QuizHistory[];
}