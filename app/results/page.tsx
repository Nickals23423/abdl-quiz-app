'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizHistory } from '../../types/quiz';
import { allQuizzes } from '../../data/quizzes';

export default function ResultsPage() {
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load quiz history
    const saved = localStorage.getItem('quizHistory');
    if (saved) {
      try {
        const history = JSON.parse(saved);
        setQuizHistory(history);
        
        // Calculate achievements
        const badges = history.flatMap((h: QuizHistory) => h.result.badges || []);
        const uniqueBadges = [...new Set(badges)] as string[];
        setAchievements(uniqueBadges);
      } catch (e) {
        console.error('Error loading quiz history:', e);
      }
    }
  }, []);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all your quiz history? This cannot be undone.')) {
      localStorage.removeItem('quizHistory');
      setQuizHistory([]);
      setAchievements([]);
    }
  };

  const allBadges = [
    'hugger', 'soft-heart', 'artist', 'creative-spirit', 'energetic', 'playful-spirit',
    'peaceful', 'zen-master', 'helper', 'kind-heart', 'brave', 'explorer',
    'expert', 'wise-little', 'learner', 'curious-mind', 'newcomer', 'brave-start',
    'dreamer', 'magic-maker', 'comfort-creator', 'adventure-seeker', 'beauty-finder',
    'thoughtful', 'caring-friend'
  ];

  const achievementStats = {
    totalQuizzes: quizHistory.length,
    uniqueResults: new Set(quizHistory.map(h => h.result.id)).size,
    totalBadges: achievements.length,
    allBadges: allBadges.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cotton via-blush/20 to-sky/20">
      <header className="bg-white/30 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-medium text-ink">🏆 My Little Space Journey</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => router.push('/quiz')}
              className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
            >
              Take Quiz
            </button>
            <button 
              onClick={() => router.push('/')}
              className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
            >
              Home
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {quizHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl mb-4 text-ink">Start Your Journey!</h2>
            <p className="text-ink/70 mb-6">
              You haven't taken any quizzes yet. Ready to discover your little side?
            </p>
            <button 
              onClick={() => router.push('/quiz')}
              className="btn-primary"
            >
              Take Your First Quiz! ✨
            </button>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <section className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="card text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-2xl font-medium text-ink">{achievementStats.totalQuizzes}</div>
                <div className="text-sm text-ink/70">Quizzes Taken</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl mb-2">🎭</div>
                <div className="text-2xl font-medium text-ink">{achievementStats.uniqueResults}</div>
                <div className="text-sm text-ink/70">Unique Results</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl mb-2">🏅</div>
                <div className="text-2xl font-medium text-ink">{achievementStats.totalBadges}</div>
                <div className="text-sm text-ink/70">Badges Earned</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-2xl font-medium text-ink">
                  {Math.round((achievementStats.totalBadges / achievementStats.allBadges) * 100)}%
                </div>
                <div className="text-sm text-ink/70">Collection</div>
              </div>
            </section>

            {/* Achievements Section */}
            {achievements.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl mb-4 text-ink">🏆 Your Achievements</h2>
                <div className="card">
                  <div className="flex flex-wrap gap-2">
                    {achievements.map((badge, index) => (
                      <span 
                        key={index}
                        className="bg-gradient-to-r from-mint to-peach text-ink px-3 py-2 rounded-full text-sm font-medium shadow-sm"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-sm text-ink/60">
                      {allBadges.length - achievements.length} more badges to discover!
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Quiz History */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-ink">📚 Quiz History</h2>
                <button 
                  onClick={clearHistory}
                  className="text-ink/50 hover:text-ink/70 text-sm px-3 py-1 rounded-lg hover:bg-white/20"
                >
                  Clear History
                </button>
              </div>
              
              <div className="space-y-4">
                {quizHistory.map((history, index) => {
                  const quiz = allQuizzes.find(q => q.id === history.quizId);
                  return (
                    <div key={index} className="card">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{history.result.emoji}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-ink">{history.result.title}</h3>
                              <div className="text-sm text-ink/60">
                                {quiz?.title} • {new Date(history.completedAt).toLocaleDateString()} at {new Date(history.completedAt).toLocaleTimeString()}
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
                                className="text-sm bg-peach/50 hover:bg-peach/70 text-ink px-3 py-1 rounded-full"
                              >
                                Share 📤
                              </button>
                            )}
                          </div>
                          <p className="text-ink/70 text-sm mb-3">
                            {history.result.description}
                          </p>
                          {history.result.badges && history.result.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {history.result.badges.map((badge, badgeIndex) => (
                                <span 
                                  key={badgeIndex}
                                  className="bg-mint/30 text-ink px-2 py-1 rounded-full text-xs"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className="card">
                <h3 className="text-xl mb-3 text-ink">Ready for More Adventures? 🌟</h3>
                <p className="text-ink/70 mb-4">
                  Keep exploring and earning new badges!
                </p>
                <button 
                  onClick={() => router.push('/quiz')}
                  className="btn-primary"
                >
                  Take Another Quiz
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}