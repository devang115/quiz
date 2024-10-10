import React from 'react';
import { Quiz } from '../types';
import { BookOpen } from 'lucide-react';

interface QuizListProps {
  quizzes: Quiz[];
  onSelectQuiz: (quizId: number) => void;
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onSelectQuiz }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <button
              onClick={() => onSelectQuiz(quiz.id)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Start Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;