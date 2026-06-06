import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import AvatarSelection from './components/AvatarSelection';
import GameOver from './components/GameOver';

type GameState = 'avatar-selection' | 'playing' | 'game-over';

interface Player {
  id: string;
  name: string;
  avatar: string;
  position: number;
  medals: number;
  shields: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('avatar-selection');
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);

  const handleAvatarsSelected = (selectedPlayers: Player[]) => {
    setPlayers(selectedPlayers);
    setGameState('playing');
  };

  const handleGameEnd = (winnerPlayer: Player) => {
    setWinner(winnerPlayer);
    setGameState('game-over');
  };

  const handleRestart = () => {
    setGameState('avatar-selection');
    setPlayers([]);
    setWinner(null);
  };

  return (
    <div className="app">
      {gameState === 'avatar-selection' && (
        <AvatarSelection onAvatarsSelected={handleAvatarsSelected} />
      )}
      {gameState === 'playing' && (
        <GameBoard players={players} onGameEnd={handleGameEnd} />
      )}
      {gameState === 'game-over' && winner && (
        <GameOver winner={winner} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;