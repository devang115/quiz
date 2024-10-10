import React, { useState } from 'react';
import { Question, QuizState } from '../types';

interface QuizPageProps {
  questions: Question[];
  onComplete: (state: QuizState) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswer = (answerIndex: number) => {
    const newUserAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newUserAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = newUserAnswers.reduce((acc, answer, index) => {
        return answer === questions[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      onComplete({ currentQuestionIndex, userAnswers: newUserAnswers, score });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p className="text-lg mb-6 text-gray-700">{currentQuestion.text}</p>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left py-3 px-4 rounded-md bg-gray-100 hover:bg-blue-100 transition-colors duration-300"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;