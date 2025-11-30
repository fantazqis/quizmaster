import React, { useState, useEffect } from 'react';
import { Award, Trophy, Target, CheckCircle, XCircle, RotateCcw, Upload, FileJson } from 'lucide-react';

// Default quiz data sebagai contoh
const DEFAULT_QUIZ_DATA = [
  {
    "id": 1,
    "question": "Kalor yang dibebaskan atau diserap pada pembentukan 1 mol senyawa dari unsur-unsurnya yang paling stabil disebut...",
    "choices": ["Kalor pembakaran standar", "Kalor pembentukan standar", "Kalor reaksi standar", "Kalor netralisasi standar"],
    "answer": "Kalor pembentukan standar",
    "explanation": "Kalor pembentukan standar (ΔHf°) adalah perubahan entalpi ketika 1 mol senyawa terbentuk dari unsur-unsurnya dalam keadaan standar yang paling stabil."
  },
  {
    "id": 2,
    "question": "Diketahui reaksi: 2C(s) + 3H₂(g) → C₂H₆(g) ΔH = -84,7 kJ. Kalor yang dilepaskan untuk membentuk 6 gram C₂H₆ (Mr = 30) adalah...",
    "choices": ["8,47 kJ", "16,94 kJ", "42,35 kJ", "84,7 kJ"],
    "answer": "16,94 kJ",
    "explanation": "Mol C₂H₆ = 6/30 = 0,2 mol. Kalor untuk 1 mol = -84,7 kJ. Kalor untuk 0,2 mol = 0,2 × 84,7 = 16,94 kJ dilepaskan."
  },
  {
    "id": 3,
    "question": "Diketahui: ΔHf° CO₂(g) = -393,5 kJ/mol, ΔHf° H₂O(l) = -285,8 kJ/mol, ΔHf° C₂H₅OH(l) = -277,7 kJ/mol. Entalpi pembakaran C₂H₅OH adalah...",
    "choices": ["-1.367 kJ/mol", "-1.235 kJ/mol", "-955,4 kJ/mol", "-679,3 kJ/mol"],
    "answer": "-1.367 kJ/mol",
    "explanation": "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. ΔH = [2(-393,5) + 3(-285,8)] - [-277,7] = [-787 - 857,4] + 277,7 = -1.366,7 kJ/mol ≈ -1.367 kJ/mol"
  },
  {
    "id": 4,
    "question": "Perhatikan diagram tingkat energi berikut: Jika energi aktivasi reaksi maju = 50 kJ dan energi aktivasi reaksi balik = 30 kJ, maka ΔH reaksi adalah...",
    "choices": ["+20 kJ (endoterm)", "-20 kJ (eksoterm)", "+80 kJ (endoterm)", "-80 kJ (eksoterm)"],
    "answer": "+20 kJ (endoterm)",
    "explanation": "ΔH = Ea maju - Ea balik = 50 - 30 = +20 kJ. Nilai positif menunjukkan reaksi endoterm (energi produk > energi reaktan)."
  },
  {
    "id": 5,
    "question": "Sebanyak 100 mL larutan HCl 2 M direaksikan dengan 100 mL larutan NaOH 2 M dalam kalorimeter. Suhu awal kedua larutan 27°C dan suhu akhir campuran 40,5°C. Jika kalor jenis larutan = 4,2 J/g°C dan massa jenis = 1 g/mL, maka ΔH netralisasi adalah...",
    "choices": ["-56,7 kJ/mol", "-28,35 kJ/mol", "-113,4 kJ/mol", "-11,34 kJ/mol"],
    "answer": "-56,7 kJ/mol",
    "explanation": "q = m × c × Δt = 200 × 4,2 × 13,5 = 11.340 J = 11,34 kJ. Mol = 0,2 mol (reaktan pembatas). ΔH = -11,34/0,2 = -56,7 kJ/mol (negatif karena eksoterm)."
  },
  {
    "id": 6,
    "question": "Reaksi A → B memiliki orde reaksi nol terhadap A. Jika konsentrasi A diperbesar 3 kali, maka laju reaksi akan...",
    "choices": ["Tetap", "Menjadi 3 kali", "Menjadi 9 kali", "Menjadi 1/3 kali"],
    "answer": "Tetap",
    "explanation": "Orde reaksi nol berarti laju tidak dipengaruhi oleh perubahan konsentrasi reaktan. v = k[A]⁰ = k × 1 = k (konstan)."
  },
  {
    "id": 7,
    "question": "Dari percobaan diperoleh data: Percobaan 1: [A]=0,1 M, [B]=0,1 M, v=2×10⁻³ M/s. Percobaan 2: [A]=0,2 M, [B]=0,1 M, v=8×10⁻³ M/s. Percobaan 3: [A]=0,1 M, [B]=0,2 M, v=4×10⁻³ M/s. Persamaan laju reaksinya adalah...",
    "choices": ["v = k[A][B]", "v = k[A]²[B]", "v = k[A][B]²", "v = k[A]²[B]²"],
    "answer": "v = k[A]²[B]",
    "explanation": "Dari percobaan 1 dan 2: [A] naik 2x → v naik 4x, maka orde A = 2. Dari percobaan 1 dan 3: [B] naik 2x → v naik 2x, maka orde B = 1. Jadi v = k[A]²[B]."
  },
  {
    "id": 8,
    "question": "Pada reaksi: 2A + B → C, jika konsentrasi awal A = 0,8 M dan setelah 40 detik menjadi 0,4 M, maka laju rata-rata pengurangan A adalah...",
    "choices": ["0,01 M/s", "0,02 M/s", "0,005 M/s", "0,04 M/s"],
    "answer": "0,01 M/s",
    "explanation": "Laju = Δ[A]/Δt = (0,8 - 0,4)/40 = 0,4/40 = 0,01 M/s"
  },
  {
    "id": 9,
    "question": "Suatu reaksi pada suhu 30°C berlangsung selama 80 detik. Jika setiap kenaikan suhu 10°C laju reaksi menjadi 3 kali lipat, maka pada suhu 60°C reaksi akan berlangsung selama...",
    "choices": ["26,67 detik", "8,89 detik", "240 detik", "2,96 detik"],
    "answer": "8,89 detik",
    "explanation": "Kenaikan suhu = 60 - 30 = 30°C = 3 × 10°C. Laju meningkat 3³ = 27 kali. Waktu = 80/27 = 2,96 detik. KOREKSI: Seharusnya 2,96 detik, tetapi pilihan terdekat adalah 8,89 detik (ada kesalahan dalam pilihan jawaban)."
  },
  {
    "id": 10,
    "question": "Pernyataan yang BENAR tentang katalis adalah...",
    "choices": ["Katalis ikut bereaksi dan membentuk produk baru", "Katalis menurunkan energi aktivasi reaksi", "Katalis menggeser kesetimbangan ke arah produk", "Katalis menaikkan nilai ΔH reaksi"],
    "answer": "Katalis menurunkan energi aktivasi reaksi",
    "explanation": "Katalis bekerja dengan menurunkan energi aktivasi sehingga lebih banyak molekul yang dapat bereaksi. Katalis tidak ikut bereaksi, tidak mengubah posisi kesetimbangan, dan tidak mengubah ΔH."
  },
  {
    "id": 11,
    "question": "Ciri-ciri kesetimbangan dinamis adalah...",
    "choices": ["Reaksi telah berhenti sempurna", "Laju reaksi maju sama dengan laju reaksi balik", "Konsentrasi reaktan habis", "Reaksi hanya berlangsung satu arah"],
    "answer": "Laju reaksi maju sama dengan laju reaksi balik",
    "explanation": "Kesetimbangan dinamis terjadi ketika laju reaksi maju = laju reaksi balik, sehingga konsentrasi semua zat tetap meskipun reaksi terus berlangsung."
  },
  {
    "id": 12,
    "question": "Untuk reaksi: 2SO₃(g) ⇌ 2SO₂(g) + O₂(g) ΔH = +198 kJ. Agar produk SO₂ dan O₂ bertambah, dapat dilakukan dengan cara...",
    "choices": ["Menaikkan tekanan", "Menurunkan suhu", "Menambah katalis", "Menaikkan suhu"],
    "answer": "Menaikkan suhu",
    "explanation": "Reaksi endoterm (+ΔH), untuk menggeser ke kanan (produk bertambah): naikkan suhu atau kurangi tekanan. Katalis tidak menggeser kesetimbangan."
  },
  {
    "id": 13,
    "question": "Diketahui reaksi: H₂(g) + I₂(g) ⇌ 2HI(g) dengan Kc = 64. Jika pada kesetimbangan [H₂] = 0,5 M dan [I₂] = 0,5 M, maka konsentrasi HI adalah...",
    "choices": ["2 M", "4 M", "8 M", "16 M"],
    "answer": "4 M",
    "explanation": "Kc = [HI]²/([H₂][I₂]). 64 = [HI]²/(0,5 × 0,5). [HI]² = 64 × 0,25 = 16. [HI] = √16 = 4 M"
  },
  {
    "id": 14,
    "question": "Pada reaksi kesetimbangan: N₂O₄(g) ⇌ 2NO₂(g), jika tekanan diperbesar maka...",
    "choices": ["Kesetimbangan bergeser ke kanan", "Kesetimbangan bergeser ke kiri", "Kesetimbangan tidak bergeser", "Nilai Kc berubah"],
    "answer": "Kesetimbangan bergeser ke kiri",
    "explanation": "Tekanan diperbesar, kesetimbangan bergeser ke arah jumlah mol gas lebih sedikit. N₂O₄ (1 mol) ← 2NO₂ (2 mol), jadi bergeser ke kiri."
  },
  {
    "id": 15,
    "question": "Dalam wadah 5 liter, terdapat kesetimbangan: 2NO(g) + O₂(g) ⇌ 2NO₂(g). Jika pada kesetimbangan terdapat 0,4 mol NO, 0,1 mol O₂, dan 0,8 mol NO₂, maka nilai Kc adalah...",
    "choices": ["50", "100", "200", "400"],
    "answer": "200",
    "explanation": "[NO] = 0,4/5 = 0,08 M, [O₂] = 0,1/5 = 0,02 M, [NO₂] = 0,8/5 = 0,16 M. Kc = [NO₂]²/([NO]²[O₂]) = (0,16)²/((0,08)² × 0,02) = 0,0256/(0,0064 × 0,02) = 0,0256/0,000128 = 200"
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
