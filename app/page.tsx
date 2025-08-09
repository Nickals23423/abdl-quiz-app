'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [hasConsented, setHasConsented] = useState(false);
  const router = useRouter();

  if (!hasConsented) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="card">
            <div className="mb-6">
              <h1 className="text-3xl mb-4 text-ink">🧸 Welcome to Little Space Quizzes 🧸</h1>
              <p className="text-ink/70 mb-4">
                This is a safe, playful space for ABDL-themed personality quizzes and fun activities.
              </p>
              <p className="text-sm text-ink/60 mb-6">
                Content is age-regression themed and completely non-sexual. All quizzes are anonymous and optional.
              </p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setHasConsented(true)}
                className="btn-primary w-full"
              >
                I understand, let me explore! ✨
              </button>
              
              <p className="text-xs text-ink/50">
                By continuing, you confirm you're 18+ and understand this content is age-regression themed
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/30 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-medium text-ink">🧸 Little Space Quizzes</h1>
          <nav className="flex gap-4">
            <button 
              onClick={() => router.push('/quiz')}
              className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
            >
              Quizzes
            </button>
            <button 
              onClick={() => router.push('/results')}
              className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
            >
              My Results
            </button>
            <button 
              onClick={() => router.push('/games')}
              className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
            >
              Games
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-ink">Discover Your Little Side! 🌟</h2>
          <p className="text-ink/70 text-lg max-w-2xl mx-auto">
            Take fun, safe quizzes to explore different aspects of age regression and ABDL lifestyle.
            All completely anonymous and judgment-free!
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl mb-3 text-ink">Personality Quizzes</h3>
            <p className="text-ink/70 mb-4">
              Discover what type of little you are with fun personality-based questions!
            </p>
            <button 
              onClick={() => router.push('/quiz')}
              className="btn-primary w-full"
            >
              Take Quiz
            </button>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl mb-3 text-ink">Knowledge Trivia</h3>
            <p className="text-ink/70 mb-4">
              Test your knowledge with fun, light-hearted trivia about little space!
            </p>
            <button 
              onClick={() => router.push('/quiz')}
              className="btn-secondary w-full"
            >
              Start Trivia
            </button>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🎪</div>
            <h3 className="text-xl mb-3 text-ink">Scenario Adventures</h3>
            <p className="text-ink/70 mb-4">
              Explore fun 'what would you do' scenarios and see where they lead!
            </p>
            <button 
              onClick={() => router.push('/quiz')}
              className="btn-primary w-full"
            >
              Adventure Time
            </button>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blush/20 via-sky/20 to-mint/20 rounded-3xl p-8 text-center">
          <h3 className="text-2xl mb-4 text-ink">🏆 Your Achievements</h3>
          <p className="text-ink/70 mb-6">
            Complete quizzes to earn cute badges and unlock new content!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/50 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🌟</div>
              <div className="text-sm text-ink/70">First Quiz</div>
            </div>
            <div className="bg-white/30 rounded-2xl p-4 text-center opacity-50">
              <div className="text-2xl mb-2">🧸</div>
              <div className="text-sm text-ink/70">Teddy Collector</div>
            </div>
            <div className="bg-white/30 rounded-2xl p-4 text-center opacity-50">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-sm text-ink/70">Creative Spirit</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white/20 backdrop-blur-sm border-t border-white/20 p-6 text-center text-ink/60 text-sm">
        <p>Made with 💕 for the ABDL community • Safe • Anonymous • Fun</p>
      </footer>
    </div>
  );
}