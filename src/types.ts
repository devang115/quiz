export interface Quiz {
  id: number;
  title: string;
  description: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  userAnswers: number[];
  score: number;
}