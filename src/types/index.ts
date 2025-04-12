// types/index.ts
export type WordType = {
  id: string;
  word: string;
  definition: string;
  example: string;
  partOfSpeech: string;
  examType: ExamType[];
  difficulty: number;
};

export type GameModeType = 'multiple-choice' | 'flashcard' | 'spelling';
export type ExamType = 'toeic' | 'ielts';

export type FeedbackType = {
  show: boolean;
  correct: boolean;
  message?: string;
};

export type OptionType = {
  id: string;
  text: string;
  isCorrect: boolean;
};
