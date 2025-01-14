import React, { useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { Controls } from './components/Controls';
import { PayTable } from './components/PayTable';
import { GambleFeature } from './components/GambleFeature';
import { FreeSpinsIntro } from './components/FreeSpinsIntro';
import { WinPresentation } from './components/WinPresentation';
import { useGameLogic } from './hooks/useGameLogic';
import { useGameSounds } from './hooks/useGameSounds';
import { useAutoPlay } from './hooks/useAutoPlay';
import './styles/animations.css';
import './styles/effects.css';

function App() {
  const { 
    gameState, 
    reels, 
    spin, 
    setBet, 
    setPaylines, 
    gamble,
    collectWin 
  } = useGameLogic();

  const { playSound, playWinSound, toggleMute, isMuted } = useGameSounds();
  const { startAutoPlay, stopAutoPlay, isAutoPlaying } = useAutoPlay(spin, gameState);

  // Handle win sounds
  useEffect(() => {
    if (gameState.lastWin > 0 && !gameState.isSpinning) {
      playWinSound(gameState.lastWin, gameState.bet);
    }
  }, [gameState.lastWin, gameState.isSpinning]);

  // Handle spin sound
  useEffect(() => {
    if (gameState.isSpinning) {
      playSound('SPIN_START');
    }
  }, [gameState.isSpinning]);

  return (
    <div className="min-h-screen bg-[#0A0605] text-[#E8C086]">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#C4973B]">Book of Ra Deluxe</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMute}
              className="btn-secondary"
            >
              {isMuted ? 'Sound Off' : 'Sound On'}
            </button>
            <button
              onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
              className={`btn-secondary ${isAutoPlaying ? 'bg-[#C4973B]' : ''}`}
            >
              {isAutoPlaying ? 'Stop Auto' : 'Auto Play'}
            </button>
          </div>
        </header>

        {/* Main Game Area */}
        <div className="relative">
          <GameBoard 
            reels={reels}
            gameState={gameState}
            activePaylines={gameState.activePaylines}
          />

          <Controls
            balance={gameState.balance}
            bet={gameState.bet}
            onBetChange={setBet}
            onSpin={spin}
            isSpinning={gameState.isSpinning}
            onAutoPlayToggle={isAutoPlaying ? stopAutoPlay : startAutoPlay}
            isAutoPlay={isAutoPlaying}
            onPaylineChange={setPaylines}
            activePaylines={gameState.activePaylines}
            onCollect={collectWin}
            canCollect={gameState.lastWin > 0}
          />
        </div>

        {/* Conditional Overlays */}
        {gameState.gameMode === 'gamble' && (
          <GambleFeature
            currentWin={gameState.lastWin}
            onChoice={gamble}
            onCollect={collectWin}
            history={gameState.winHistory}
          />
        )}

        {gameState.gameMode === 'free' && gameState.freeSpinsLeft === 10 && (
          <FreeSpinsIntro
            expandingSymbol={gameState.expandingSymbol}
            onClose={() => playSound('FREE_SPINS_TRIGGER')}
          />
        )}

        {gameState.lastWin > 0 && !gameState.isSpinning && (
          <WinPresentation
            amount={gameState.lastWin}
            isBigWin={gameState.lastWin >= gameState.bet * 50}
            onComplete={() => {
              if (gameState.gameMode === 'base') {
                playSound('COINS');
              }
            }}
          />
        )}

        {/* PayTable */}
        <PayTable 
          bet={gameState.bet}
          activePaylines={gameState.activePaylines}
        />
      </div>
    </div>
  );
}

export default App;
