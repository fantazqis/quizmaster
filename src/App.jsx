import React, { useState, useEffect } from 'react';
import { Award, Trophy, Target, CheckCircle, XCircle, RotateCcw, Upload, FileJson } from 'lucide-react';

// Default quiz data sebagai contoh
const DEFAULT_QUIZ_DATA = [
  {
    "id": 1,
    "question": "What is the capital of France?",
    "choices": ["Paris", "Berlin", "Madrid", "Rome"],
    "answer": "Paris",
    "explanation": "Paris has been France's capital since the 10th century."
  },
  {
    "id": 2,
    "question": "Which planet is known as the Red Planet?",
    "choices": ["Venus", "Mars", "Jupiter", "Saturn"],
    "answer": "Mars",
    "explanation": "Mars appears red due to iron oxide (rust) on its surface."
  },
  {
    "id": 3,
    "question": "What is the largest ocean on Earth?",
    "choices": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    "answer": "Pacific Ocean",
    "explanation": "The Pacific Ocean covers approximately 63 million square miles."
  },
  {
    "id": 4,
    "question": "Who painted the Mona Lisa?",
    "choices": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    "answer": "Leonardo da Vinci",
    "explanation": "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
  },
  {
    "id": 5,
    "question": "What is the smallest prime number?",
    "choices": ["0", "1", "2", "3"],
    "answer": "2",
    "explanation": "2 is the smallest and only even prime number."
  }
];

const QuizMaster = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const currentQuestion = quizData ? quizData[currentQuestionIndex] : null;
  const totalQuestions = quizData ? quizData.length : 0;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadError(null);
    setFileName(file.name);

    if (!file.name.endsWith('.json')) {
      setUploadError('File harus berformat .json');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        
        // Validasi struktur JSON
        if (!Array.isArray(jsonData)) {
          setUploadError('Format JSON harus berupa array');
          return;
        }

        // Validasi setiap item quiz
        const isValid = jsonData.every(item => 
          item.question && 
          Array.isArray(item.choices) && 
          item.choices.length > 0 &&
          item.answer &&
          item.choices.includes(item.answer)
        );

        if (!isValid) {
          setUploadError('Format quiz tidak valid. Pastikan setiap item memiliki: question, choices (array), answer (harus ada di choices), dan explanation (opsional)');
          return;
        }

        setQuizData(jsonData);
        setUploadError(null);
      } catch (error) {
        setUploadError('File JSON tidak valid: ' + error.message);
      }
    };

    reader.onerror = () => {
      setUploadError('Gagal membaca file');
    };

    reader.readAsText(file);
  };

  // Mulai quiz dengan data yang dipilih
  const startQuiz = (data) => {
    setQuizData(data);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (choice) => {
    if (!isAnswered) {
      setSelectedAnswer(choice);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > maxStreak) {
        setMaxStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }

    setUserAnswers([...userAnswers, {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setQuizCompleted(false);
    setUserAnswers([]);
    setQuizData(null);
    setFileName(null);
  };

  const isCorrect = isAnswered && selectedAnswer === currentQuestion.answer;
  const isPerfectScore = score === totalQuestions;

  // Upload Page - Tampilan awal untuk upload file JSON
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-blue-600 mb-3">QuizMaster</h1>
            <p className="text-xl text-gray-600">Upload file JSON quiz atau gunakan quiz default</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Upload Quiz JSON
              </h2>
              
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <FileJson className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 font-semibold hover:text-blue-700">
                    Klik untuk upload file JSON
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 text-sm mt-2">atau drag and drop file di sini</p>
                
                {fileName && !uploadError && (
                  <div className="mt-4 text-green-600 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{fileName}</span>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 text-red-700">
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Error:</p>
                      <p className="text-sm">{uploadError}</p>
                    </div>
                  </div>
                </div>
              )}

              {quizData && !uploadError && (
                <button
                  onClick={() => startQuiz(quizData)}
                  className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                  Mulai Quiz ({quizData.length} pertanyaan)
                </button>
              )}
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <p className="text-center text-gray-600 mb-4 font-medium">Atau</p>
              <button
                onClick={() => startQuiz(DEFAULT_QUIZ_DATA)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors border-2 border-gray-300"
              >
                Gunakan Quiz Default ({DEFAULT_QUIZ_DATA.length} pertanyaan)
              </button>
            </div>
          </div>

          {/* Format JSON Example */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-3">Format JSON yang diperlukan:</h3>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
{`[
  {
    "id": 1,
    "question": "Pertanyaan Anda?",
    "choices": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "answer": "Pilihan A",
    "explanation": "Penjelasan jawaban (opsional)"
  }
]`}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            {isPerfectScore ? (
              <div className="mb-6">
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-4xl font-bold text-blue-600 mb-2">Perfect Score!</h2>
                <p className="text-xl text-gray-600">You're a QuizMaster Champion!</p>
              </div>
            ) : (
              <div className="mb-6">
                <Award className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Quiz Complete!</h2>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 text-sm mb-1">Final Score</p>
              <p className="text-4xl font-bold text-blue-600">{score}/{totalQuestions}</p>
              <p className="text-gray-500 text-sm mt-1">
                {Math.round((score / totalQuestions) * 100)}% Correct
              </p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 text-sm mb-1">Best Streak</p>
              <p className="text-4xl font-bold text-indigo-600">{maxStreak}</p>
              <p className="text-gray-500 text-sm mt-1">Consecutive Correct</p>
            </div>
          </div>

          {isPerfectScore && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-700">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Achievement Unlocked: Perfect Quiz!</span>
              </div>
            </div>
          )}

          {maxStreak >= 5 && (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Achievement Unlocked: 5+ Answer Streak!</span>
              </div>
            </div>
          )}

          <button
            onClick={handleRestartQuiz}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">QuizMaster</h1>
          <p className="text-gray-600">Test your knowledge and track your progress</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              Score: {score}/{totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {streak > 0 && (
            <div className="mt-2 flex items-center justify-center gap-1 text-sm text-orange-600 font-semibold">
              <Target className="w-4 h-4" />
              {streak} streak!
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Choices */}
          <div className="space-y-3 mb-6">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected = selectedAnswer === choice;
              const isCorrectChoice = choice === currentQuestion.answer;
              const showCorrect = isAnswered && isCorrectChoice;
              const showIncorrect = isAnswered && isSelected && !isCorrectChoice;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(choice)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  } ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{choice}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          {isAnswered && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold mb-2 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  {!isCorrect && (
                    <p className="text-gray-700 mb-2">
                      The correct answer is: <span className="font-semibold">{currentQuestion.answer}</span>
                    </p>
                  )}
                  <p className="text-gray-600 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isAnswered ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-600 text-sm">Answered</p>
              <p className="text-xl font-bold text-blue-600">{currentQuestionIndex + (isAnswered ? 1 : 0)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Correct</p>
              <p className="text-xl font-bold text-green-600">{score}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Current Streak</p>
              <p className="text-xl font-bold text-orange-600">{streak}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMaster;
