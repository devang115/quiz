import React from 'react';
import { Question, QuizState } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ScoreSummaryProps {
  questions: Question[];
  quizState: QuizState;
  onRestart: () => void;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ questions, quizState, onRestart }) => {
  const { score, userAnswers } = quizState;
  const totalQuestions = questions.length;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Quiz Results</h2>
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-blue-600">{score} / {totalQuestions}</p>
        <p className="text-xl text-gray-600 mt-2">Correct Answers</p>
      </div>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <p className="font-semibold mb-2 text-gray-800">{question.text}</p>
            <div className="flex items-center">
              <p className="text-gray-600 flex-grow">
                Your answer: {question.options[userAnswers[index]]}
              </p>
              {userAnswers[index] === question.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            {userAnswers[index] !== question.correctAnswer && (
              <p className="text-green-600 mt-1">
                Correct answer: {question.options[question.correctAnswer]}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onRestart}
        className="w-full mt-8 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;