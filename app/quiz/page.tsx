'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizComponent from '../../components/QuizComponent';
import { allQuizzes } from '../../data/quizzes';
import { QuizResult, UserAnswer, QuizHistory } from '../../types/quiz';

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const router = useRouter();

  // Load quiz history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('quizHistory');
    if (saved) {
      try {
        const history = JSON.parse(saved);
        setQuizHistory(history);
      } catch (e) {
        console.error('Error loading quiz history:', e);
      }
    }
  }, []);

  const saveQuizResult = (quizId: string, result: QuizResult, answers: UserAnswer[]) => {
    const newHistory: QuizHistory = {
      quizId,
      result,
      answers,
      completedAt: new Date()
    };

    const updatedHistory = [newHistory, ...quizHistory.slice(0, 9)]; // Keep last 10
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const handleQuizComplete = (result: QuizResult, answers: UserAnswer[]) => {
    const quiz = allQuizzes.find(q => q.id === selectedQuiz);
    if (quiz) {
      saveQuizResult(quiz.id, result, answers);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    const quiz = allQuizzes.find(q => q.id === selectedQuiz);
    if (!quiz) {
      return <div>Quiz not found</div>;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-cotton via-blush/20 to-sky/20">
        <QuizComponent 
          quiz={quiz} 
          onComplete={handleQuizComplete}
          onBack={handleBackToQuizzes}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cotton via-blush/20 to-sky/20">
      <header className="bg-white/30 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-medium text-ink">🧸 Little Space Quizzes</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
          >
            Home
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="text-center mb-8">
          <h2 className="text-3xl mb-4 text-ink">Choose Your Adventure! ✨</h2>
          <p className="text-ink/70 text-lg">
            Pick a quiz type and discover something new about your little side!
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-8">
          {allQuizzes.map((quiz) => (
            <div key={quiz.id} className="card text-center">
              <div className="text-4xl mb-4">{quiz.emoji}</div>
              <h3 className="text-xl mb-3 text-ink">{quiz.title}</h3>
              <p className="text-ink/70 mb-4 text-sm">
                {quiz.description}
              </p>
              <div className="text-xs text-ink/50 mb-4">
                {quiz.questions.length} questions • {quiz.type}
              </div>
              <button 
                onClick={() => setSelectedQuiz(quiz.id)}
                className="btn-primary w-full"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </section>

        {quizHistory.length > 0 && (
          <section className="bg-white/30 backdrop-blur-sm rounded-3xl p-6">
            <h3 className="text-xl mb-4 text-ink">Your Recent Results 🌟</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {quizHistory.slice(0, 4).map((history, index) => {
                const quiz = allQuizzes.find(q => q.id === history.quizId);
                return (
                  <div key={index} className="bg-white/50 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{history.result.emoji}</span>
                      <div>
                        <div className="font-medium text-ink text-sm">
                          {history.result.title}
                        </div>
                        <div className="text-ink/60 text-xs">
                          {quiz?.title} • {new Date(history.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {history.result.shareableText && (
                      <button 
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: 'My Little Space Quiz Result',
                              text: history.result.shareableText,
                              url: window.location.href
                            });
                          } else {
                            navigator.clipboard.writeText(history.result.shareableText || '');
                            alert('Result copied to clipboard! 📋');
                          }
                        }}
                        className="text-xs bg-peach/50 hover:bg-peach/70 text-ink px-3 py-1 rounded-full mt-2"
                      >
                        Share Again 📤
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {quizHistory.length > 4 && (
              <div className="text-center mt-4">
                <button 
                  onClick={() => router.push('/results')}
                  className="text-ink/70 hover:text-ink text-sm"
                >
                  View All Results →
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}