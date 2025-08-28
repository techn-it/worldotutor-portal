"use client"; 
import { UsesAuth } from "@/context/UsesAuth";
// import { mcqQuestions } from "@/data/McqQuestion";
import { RotateCcw, CheckCircle, XCircle, BookOpen, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const MCQExam = () => {
    const [examState, setExamState] = useState('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600);
    const [examQuestions, setExamQuestions] = useState([]);
    const {mcqQuestions} = UsesAuth();
     useEffect(() => {
      let timer;
      if (examState === 'taking' && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setExamState('results');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [examState, timeLeft]);
  
    const startExam = () => {
      const shuffledQuestions = [...mcqQuestions].sort(() => Math.random() - 0.5).slice(0, 8);
       setExamQuestions(shuffledQuestions);
      setExamState('taking');
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setTimeLeft(600);
    };
  
    const selectAnswer = (questionId, answerIndex) => {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    };
  
    const nextQuestion = () => {
      if (currentQuestion < examQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      }
    };
  
    const prevQuestion = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      }
    };
  
    const submitExam = () => {
      setExamState('results');
    };
  
    const resetExam = () => {
      setExamState('start');
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setTimeLeft(600);
      setExamQuestions([]);
    };
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
  
    const calculateResults = () => {
      let correct = 0;
      let attempted = 0;
      
      examQuestions.forEach(question => {
        if (selectedAnswers.hasOwnProperty(question.id)) {
          attempted++;
          if (selectedAnswers[question.id] === question.correctAnswer) {
            correct++;
          }
        }
      });
  
      const percentage = examQuestions.length > 0 ? (correct / examQuestions.length) * 100 : 0;
      return { correct, attempted, total: examQuestions.length, percentage };
    };
 
    if (examState === 'start') {
      return (
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">MCQ Exam</h2>
                <p className="text-gray-600 mb-8">Test your knowledge with our comprehensive quiz</p>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold text-blue-900 mb-4">Exam Instructions:</h3>
                  <ul className="text-left text-blue-800 space-y-2">
                    <li>• Total Questions: 8 (randomly selected)</li>
                    <li>• Time Limit: 10 minutes</li>
                    <li>• Each question has 4 options with only 1 correct answer</li>
                    <li>• You can navigate between questions</li>
                    <li>• Results will be shown immediately after submission</li>
                    <li>• Passing score: 60%</li>
                  </ul>
                </div>
  
                <button
                  onClick={startExam}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    if (examState === 'taking') {
      const question = examQuestions[currentQuestion];
  
      const progress = ((currentQuestion + 1) / examQuestions.length) * 100;
  
      return (
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">Time Left: {formatTime(timeLeft)}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                  {question?.category?.name}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {question?.question}
                </h3>
              </div>
  
              <div className="space-y-3">
                {console.log("options", question?.options)}
                {question?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(question.id, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswers[question.id] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + index)}. {option?.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
  
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
  
                <div className="flex space-x-2">
                  {examQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 rounded ${
                        index === currentQuestion
                          ? 'bg-blue-600 text-white'
                          : selectedAnswers[examQuestions[index].id] !== undefined
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
  
                {currentQuestion === examQuestions.length - 1 ? (
                  <button
                    onClick={submitExam}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    if (examState === 'results') {
      const results = calculateResults();
      const passed = results.percentage >= 60;
  
      return (
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="text-center">
                {passed ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                )}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {passed ? 'Congratulations!' : 'Better Luck Next Time!'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {passed ? 'You have successfully passed the exam.' : 'You did not meet the passing criteria.'}
                </p>
  
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{results.percentage.toFixed(1)}%</div>
                    <div className="text-sm text-blue-800">Score</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{results.correct}</div>
                    <div className="text-sm text-green-800">Correct</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{results.attempted}</div>
                    <div className="text-sm text-gray-800">Attempted</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{results.total}</div>
                    <div className="text-sm text-purple-800">Total</div>
                  </div>
                </div>
  
                <button
                  onClick={resetExam}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Take Again
                </button>
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Detailed Results</h3>
              </div>
              <div className="p-6 space-y-6">
                {examQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id];
                  const isCorrect = userAnswer+1 === question.correctAnswer;
                  const wasAttempted = userAnswer !== undefined;
  
                  return (
                    <div key={question.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                          !wasAttempted ? 'bg-gray-200 text-gray-600' :
                          isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{question.question}</p>
                          <div className="space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className={`p-2 rounded text-sm ${
                                optIndex === question.correctAnswer ? 'bg-green-50 text-green-700 font-medium' :
                                wasAttempted && optIndex === userAnswer && optIndex !== question.correctAnswer ? 'bg-red-50 text-red-700' :
                                'text-gray-600'
                              }`}>
                                {String.fromCharCode(65 + optIndex)}. {option?.text}
                                {optIndex === question.correctAnswer && ' ✓'}
                                {wasAttempted && optIndex === userAnswer && optIndex !== question.correctAnswer && ' ✗ (Your answer)'}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return null;
  };