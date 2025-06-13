export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedDuration: number; // in seconds
}

export interface InterviewSession {
  id: string;
  candidateName: string;
  position: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
  responses: InterviewResponse[];
  status: 'pending' | 'active' | 'completed' | 'cancelled';
}

export interface InterviewResponse {
  questionId: string;
  response: string;
  duration: number;
  timestamp: Date;
  confidence?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface InterviewSettings {
  position: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  categories: string[];
  customQuestions: string[];
  language: string; // Added language support
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}