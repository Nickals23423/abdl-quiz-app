'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GamesPage() {
  const router = useRouter();
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, emoji: string, isFlipped: boolean, isMatched: boolean}>>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ['🧸', '🎀', '🍼', '🌈', '⭐', '🦄', '🎨', '🧸', '🎀', '🍼', '🌈', '⭐', '🦄', '🎨'];

  const initializeGame = () => {
    const shuffled = emojis.sort(() => Math.random() - 0.5);
    const cards = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));
    setMemoryCards(cards);
    setSelectedCards([]);
    setMatches(0);
    setGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length === 2) return;
    if (memoryCards[cardId].isFlipped || memoryCards[cardId].isMatched) return;

    const newCards = [...memoryCards];
    newCards[cardId].isFlipped = true;
    setMemoryCards(newCards);

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (memoryCards[first].emoji === memoryCards[second].emoji) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].isMatched = true;
          updatedCards[second].isMatched = true;
          setMemoryCards(updatedCards);
          setMatches(matches + 1);
          setSelectedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setMemoryCards(updatedCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const isGameComplete = matches === emojis.length / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cotton via-blush/20 to-sky/20">
      <header className="bg-white/30 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-medium text-ink">🎮 Little Space Games</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => router.push('/quiz')}
              className="text-ink/70 hover:text-ink px-3 py-2 rounded-lg hover:bg-white/20"
            >
              Quizzes
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
        {!gameStarted ? (
          <div className="text-center">
            <h2 className="text-3xl mb-4 text-ink">Welcome to Little Space Games! 🌟</h2>
            <p className="text-ink/70 text-lg mb-8">
              Play fun, relaxing games to earn badges and have a wonderful time!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl mb-3 text-ink">Memory Match</h3>
                <p className="text-ink/70 mb-4">
                  Find matching pairs of cute little space items! Test your memory with adorable emojis.
                </p>
                <button 
                  onClick={initializeGame}
                  className="btn-primary w-full"
                >
                  Start Memory Game
                </button>
              </div>

              <div className="card text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl mb-3 text-ink">Color Palette</h3>
                <p className="text-ink/70 mb-4">
                  Coming soon! A relaxing coloring game with beautiful little space themes.
                </p>
                <button 
                  disabled
                  className="bg-ink/20 text-ink/50 px-6 py-3 rounded-2xl font-medium w-full cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl mb-4 text-ink text-center">🏆 Game Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/30 rounded-2xl">
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="text-sm text-ink/70">Memory Master</div>
                </div>
                <div className="text-center p-3 bg-white/30 rounded-2xl opacity-50">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-ink/70">Speed Player</div>
                </div>
                <div className="text-center p-3 bg-white/30 rounded-2xl opacity-50">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-sm text-ink/70">Artist</div>
                </div>
                <div className="text-center p-3 bg-white/30 rounded-2xl opacity-50">
                  <div className="text-2xl mb-2">🌟</div>
                  <div className="text-sm text-ink/70">Game Collector</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl mb-2 text-ink">Memory Match Game 🧠</h2>
              <div className="flex justify-center gap-4 mb-4">
                <span className="bg-white/50 px-3 py-1 rounded-full text-sm text-ink">
                  Matches: {matches}/{emojis.length / 2}
                </span>
                <button 
                  onClick={() => setGameStarted(false)}
                  className="bg-white/50 hover:bg-white/70 px-3 py-1 rounded-full text-sm text-ink"
                >
                  Back to Games
                </button>
              </div>
            </div>

            {isGameComplete ? (
              <div className="text-center card">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl mb-4 text-ink">Congratulations!</h3>
                <p className="text-ink/70 mb-6">
                  You found all the matches! You've earned the "Memory Master" badge! 🧠
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={initializeGame}
                    className="btn-primary"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => setGameStarted(false)}
                    className="btn-secondary"
                  >
                    Back to Games
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {memoryCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`
                      aspect-square rounded-2xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-300
                      ${card.isFlipped || card.isMatched 
                        ? 'bg-white border-2 border-lilac shadow-md' 
                        : 'bg-gradient-to-br from-blush to-sky hover:from-blush/80 hover:to-sky/80'
                      }
                      ${card.isMatched ? 'opacity-75 cursor-default' : ''}
                    `}
                  >
                    {card.isFlipped || card.isMatched ? card.emoji : '❓'}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}