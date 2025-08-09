'use client';

import { useState, useEffect } from 'react';
import { Quiz, QuizQuestion, UserAnswer, QuizResult } from '../types/quiz';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (result: QuizResult, answers: UserAnswer[]) => void;
  onBack: () => void;
}

export default function QuizComponent({ quiz, onComplete, onBack }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answer: any) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timestamp: new Date()
    };

    setAnswers(newAnswers);
    setUserAnswers(prev => [...prev, newUserAnswer]);

    // Check for branching logic
    if (currentQuestion.nextQuestion) {
      const nextQuestionId = currentQuestion.nextQuestion(answer);
      if (nextQuestionId) {
        const nextIndex = quiz.questions.findIndex(q => q.id === nextQuestionId);
        if (nextIndex !== -1) {
          setCurrentQuestionIndex(nextIndex);
          return;
        }
      }
    }

    // Move to next question or complete
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const quizResult = quiz.resultCalculator(newAnswers);
      setResult(quizResult);
      setIsCompleted(true);
      onComplete(quizResult, [...userAnswers, newUserAnswer]);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setUserAnswers([]);
    setIsCompleted(false);
    setResult(null);
  };

  if (isCompleted && result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="card text-center">
          <div className="text-6xl mb-4">{result.emoji}</div>
          <h2 className="text-3xl mb-4 text-ink">{result.title}</h2>
          <p className="text-ink/80 text-lg mb-6 leading-relaxed">
            {result.description}
          </p>
          
          {result.badges && result.badges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg mb-3 text-ink">Badges Earned! 🏆</h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {result.badges.map((badge, index) => (
                  <span 
                    key={index}
                    className="bg-mint/50 text-ink px-3 py-1 rounded-full text-sm border border-mint"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={handleRestart}
              className="btn-secondary"
            >
              Take Again ↻
            </button>
            <button 
              onClick={onBack}
              className="btn-primary"
            >
              Back to Quizzes
            </button>
            {result.shareableText && (
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Little Space Quiz Result',
                      text: result.shareableText,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(result.shareableText || '');
                    alert('Result copied to clipboard! 📋');
                  }
                }}
                className="bg-peach hover:bg-peach/80 text-ink px-6 py-3 rounded-2xl font-medium"
              >
                Share Result 📤
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="text-ink/70 hover:text-ink mb-4 flex items-center gap-2"
        >
          ← Back to Quizzes
        </button>
        <h1 className="text-2xl text-ink mb-2">{quiz.title}</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/50 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blush to-lilac h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-ink/60 text-sm">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="card">
        <h2 className="text-xl mb-6 text-ink leading-relaxed">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options?.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.value)}
              className="quiz-option w-full text-left"
            >
              <div className="flex items-center gap-3">
                {option.emoji && (
                  <span className="text-2xl">{option.emoji}</span>
                )}
                <span className="text-ink">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}