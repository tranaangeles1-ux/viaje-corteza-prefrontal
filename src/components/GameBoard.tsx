import React, { useState } from 'react';
import '../styles/GameBoard.css';
import Dice from './Dice';
import GameBoardSquares from './GameBoardSquares';
import ChallengeModal from './ChallengeModal';
import ScoreBoard from './ScoreBoard';
import SoundManager from '../utils/SoundManager';

interface Player {
  id: string;
  name: string;
  avatar: string;
  position: number;
  medals: number;
  shields: number;
}

interface GameBoardProps {
  players: Player[];
  onGameEnd: (winner: Player) => void;
}

const BOARD_SIZE = 40;
const FINAL_POSITION = 39;

const GameBoard: React.FC<GameBoardProps> = ({ players, onGameEnd }) => {
  const [gameState, setGameState] = useState<Player[]>(players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceResult, setDiceResult] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<any>(null);

  const soundManager = SoundManager.getInstance();

  const handleDiceRoll = (result: number) => {
    setIsRolling(true);
    soundManager.playDiceRoll();

    setTimeout(() => {
      setDiceResult(result);
      movePlayer(result);
      setIsRolling(false);
    }, 1000);
  };

  const movePlayer = (steps: number) => {
    const newGameState = [...gameState];
    const currentPlayer = newGameState[currentPlayerIndex];
    let newPosition = currentPlayer.position + steps;

    if (newPosition >= FINAL_POSITION) {
      newPosition = Math.min(newPosition, FINAL_POSITION);
    }

    currentPlayer.position = newPosition;

    // Check if player reached final position with minimum medals
    if (newPosition === FINAL_POSITION && currentPlayer.medals >= 3) {
      soundManager.playWin();
      onGameEnd(currentPlayer);
      return;
    }

    // Trigger challenge if not a special square
    const square = getSquareInfo(newPosition);
    if (square.type !== 'special') {
      setSelectedSquare(square);
      setShowChallenge(true);
    } else {
      soundManager.playSpecialSquare();
      handleSpecialSquare(square, newGameState);
    }

    setGameState(newGameState);
  };

  const handleSpecialSquare = (square: any, state: Player[]) => {
    const currentPlayer = state[currentPlayerIndex];

    if (square.id === 'sonic_synapse') {
      currentPlayer.position = Math.min(currentPlayer.position + 2, FINAL_POSITION);
      soundManager.playBonus();
    } else if (square.id === 'dopamine_effect') {
      currentPlayer.shields += 1;
      soundManager.playShield();
    }

    setGameState(state);
  };

  const getSquareInfo = (position: number) => {
    if (position === 0) return { id: 'start', type: 'start', name: 'Lóbulo Occipital', color: '#FF6B6B' };
    if (position === 39) return { id: 'end', type: 'end', name: 'La Corteza Prefrontal', color: '#FFD700' };
    if (position === 10) return { id: 'sonic_synapse', type: 'special', name: '⚡ Sinapsis Súper Sónica', color: '#00D4FF' };
    if (position === 25) return { id: 'dopamine_effect', type: 'special', name: '🛡️ Efecto Dopamina', color: '#FF00FF' };

    const categories = ['trivia', 'memory', 'action'];
    const categoryIndex = position % 3;
    const category = categories[categoryIndex];

    const categoryInfo = {
      trivia: { name: 'Trivia de Neurociencia', color: '#FF6B6B', emoji: '🔴' },
      memory: { name: 'Reto de Memoria', color: '#4ECDC4', emoji: '🔵' },
      action: { name: 'Acción Emocional/Motora', color: '#95E77D', emoji: '🟢' },
    };

    return {
      id: `square_${position}`,
      type: 'challenge',
      position,
      category,
      ...categoryInfo[category as keyof typeof categoryInfo],
    };
  };

  const handleChallengeComplete = (success: boolean) => {
    const newGameState = [...gameState];
    const currentPlayer = newGameState[currentPlayerIndex];

    if (success) {
      soundManager.playCorrect();
      currentPlayer.medals += 1;

      // Check win condition
      if (currentPlayer.position === FINAL_POSITION && currentPlayer.medals >= 3) {
        soundManager.playWin();
        onGameEnd(currentPlayer);
        return;
      }
    } else {
      soundManager.playWrong();
      if (currentPlayer.shields > 0) {
        currentPlayer.shields -= 1;
      } else {
        currentPlayer.position = Math.max(0, currentPlayer.position - 2);
      }
    }

    setGameState(newGameState);
    setShowChallenge(false);

    // Move to next player
    setTimeout(() => {
      setCurrentPlayerIndex((prev) => (prev + 1) % gameState.length);
      setDiceResult(0);
    }, 1500);
  };

  const currentPlayer = gameState[currentPlayerIndex];

  return (
    <div className="game-board-container">
      <ScoreBoard players={gameState} currentPlayerIndex={currentPlayerIndex} />

      <div className="game-content">
        <div className="board-section">
          <GameBoardSquares
            boardSize={BOARD_SIZE}
            players={gameState}
            getSquareInfo={getSquareInfo}
          />
        </div>

        <div className="control-section">
          <div className="current-player">
            <span className="player-avatar">{currentPlayer.avatar}</span>
            <div className="player-details">
              <h3>{currentPlayer.name}</h3>
              <p>Turno</p>
            </div>
          </div>

          <Dice onRoll={handleDiceRoll} isRolling={isRolling} result={diceResult} />

          <div className="player-stats">
            <div className="stat">
              <span className="stat-label">Posición:</span>
              <span className="stat-value">{currentPlayer.position}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Medallas:</span>
              <span className="stat-value">{'🏅'.repeat(currentPlayer.medals)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Escudos:</span>
              <span className="stat-value">{'🛡️'.repeat(currentPlayer.shields)}</span>
            </div>
          </div>
        </div>
      </div>

      {showChallenge && selectedSquare && (
        <ChallengeModal
          square={selectedSquare}
          onComplete={handleChallengeComplete}
          onClose={() => setShowChallenge(false)}
        />
      )}
    </div>
  );
};

export default GameBoard;