import React, { useState } from 'react';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummary';
import { Quiz, Question, QuizState } from './types';
import { Brain } from 'lucide-react';

// Mock data for quizzes and questions
const mockQuizzes: Quiz[] = [
  { id: 1, title: 'General Knowledge', description: 'Test your general knowledge with this fun quiz!' },
  { id: 2, title: 'Science Trivia', description: 'Explore the wonders of science with these challenging questions.' },
  { id: 3, title: 'Pop Culture Quiz', description: 'How well do you know your movies, music, and celebrities?' },
];

const mockQuestions: { [key: number]: Question[] } = {
  1: [
    { id: 1, text: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctAnswer: 2 },
    { id: 2, text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 },
    { id: 3, text: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], correctAnswer: 2 },
    { id: 4, text: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctAnswer: 3 },
    { id: 5, text: 'In which year did World War II end?', options: ['1943', '1945', '1947', '1950'], correctAnswer: 1 },
    { id: 6, text: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correctAnswer: 2 },
    { id: 7, text: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correctAnswer: 1 },
    { id: 8, text: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], correctAnswer: 0 },
    { id: 9, text: 'Which country is home to the kangaroo?', options: ['New Zealand', 'South Africa', 'Australia', 'Brazil'], correctAnswer: 2 },
    { id: 10, text: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 2 },
  ],
  2: [
    { id: 1, text: 'What is the chemical formula for water?', options: ['CO2', 'H2O', 'NaCl', 'O2'], correctAnswer: 1 },
    { id: 2, text: 'What is the smallest unit of matter?', options: ['Atom', 'Molecule', 'Cell', 'Electron'], correctAnswer: 0 },
    { id: 3, text: 'What is the speed of light?', options: ['299,792 km/s', '150,000 km/s', '199,792 km/s', '250,000 km/s'], correctAnswer: 0 },
    { id: 4, text: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Titanium'], correctAnswer: 2 },
    { id: 5, text: 'Which of these is not a state of matter?', options: ['Solid', 'Liquid', 'Gas', 'Rock'], correctAnswer: 3 },
    { id: 6, text: 'What is the largest organ in the human body?', options: ['Heart', 'Brain', 'Liver', 'Skin'], correctAnswer: 3 },
    { id: 7, text: 'What is the name of the force that pulls objects towards the center of the Earth?', options: ['Magnetism', 'Electricity', 'Gravity', 'Friction'], correctAnswer: 2 },
    { id: 8, text: 'Which planet is closest to the Sun?', options: ['Venus', 'Mars', 'Mercury', 'Earth'], correctAnswer: 2 },
    { id: 9, text: 'What is the process by which plants make their own food?', options: ['Photosynthesis', 'Respiration', 'Fermentation', 'Digestion'], correctAnswer: 0 },
    { id: 10, text: 'What is the unit of electrical resistance?', options: ['Volt', 'Ampere', 'Watt', 'Ohm'], correctAnswer: 3 },
  ],
  3: [
    { id: 1, text: 'Who played Jack in the movie "Titanic"?', options: ['Brad Pitt', 'Leonardo DiCaprio', 'Johnny Depp', 'Tom Cruise'], correctAnswer: 1 },
    { id: 2, text: 'Which band performed the song "Bohemian Rhapsody"?', options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'], correctAnswer: 2 },
    { id: 3, text: 'Who is known as the "King of Pop"?', options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'David Bowie'], correctAnswer: 1 },
    { id: 4, text: 'Which TV series features dragons and is based on George R.R. Martin\'s books?', options: ['The Witcher', 'Stranger Things', 'Game of Thrones', 'The Mandalorian'], correctAnswer: 2 },
    { id: 5, text: 'Who played Harry Potter in the film series?', options: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Tom Felton'], correctAnswer: 0 },
    { id: 6, text: 'Which actress won an Oscar for her role in "La La Land"?', options: ['Meryl Streep', 'Jennifer Lawrence', 'Emma Stone', 'Natalie Portman'], correctAnswer: 2 },
    { id: 7, text: 'What is the name of the fictional country in the movie "Black Panther"?', options: ['Zamunda', 'Wakanda', 'Genovia', 'Latveria'], correctAnswer: 1 },
    { id: 8, text: 'Who is the lead singer of the band Coldplay?', options: ['Chris Martin', 'Bono', 'Thom Yorke', 'Dave Grohl'], correctAnswer: 0 },
    { id: 9, text: 'Which animated movie features a character named Buzz Lightyear?', options: ['Shrek', 'Finding Nemo', 'Toy Story', 'The Lion King'], correctAnswer: 2 },
    { id: 10, text: 'Who wrote the "Harry Potter" book series?', options: ['J.R.R. Tolkien', 'C.S. Lewis', 'J.K. Rowling', 'Roald Dahl'], correctAnswer: 2 },
  ],
};

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const handleSelectQuiz = (quizId: number) => {
    const quiz = mockQuizzes.find((q) => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
      setQuizState(null);
    }
  };

  const handleQuizComplete = (state: QuizState) => {
    setQuizState(state);
  };

  const handleRestart = () => {
    setSelectedQuiz(null);
    setQuizState(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Brain className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            QuizMaster
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl">
            Test your knowledge with our exciting quizzes!
          </p>
        </div>

        {!selectedQuiz && (
          <QuizList quizzes={mockQuizzes} onSelectQuiz={handleSelectQuiz} />
        )}

        {selectedQuiz && !quizState && (
          <QuizPage questions={mockQuestions[selectedQuiz.id]} onComplete={handleQuizComplete} />
        )}

        {quizState && selectedQuiz && (
          <ScoreSummary
            questions={mockQuestions[selectedQuiz.id]}
            quizState={quizState}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;