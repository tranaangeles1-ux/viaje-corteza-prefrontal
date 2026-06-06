import React from 'react';
import '../styles/GameOver.css';

interface Player {
  id: string;
  name: string;
  avatar: string;
  position: number;
  medals: number;
  shields: number;
}

interface GameOverProps {
  winner: Player;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, onRestart }) => {
  return (
    <div className="game-over-container">
      <div className="game-over-content">
        <div className="trophy">🏆</div>
        <h1>¡GANADOR!</h1>
        <div className="winner-info">
          <span className="winner-avatar">{winner.avatar}</span>
          <h2>{winner.name}</h2>
          <p>Ha llegado a La Corteza Prefrontal</p>
        </div>

        <div className="winner-stats">
          <div className="stat">
            <span className="stat-icon">🏅</span>
            <div className="stat-content">
              <span className="stat-label">Medallas de Plasticidad</span>
              <span className="stat-value">{winner.medals}</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">🛡️</span>
            <div className="stat-content">
              <span className="stat-label">Escudos Neurotransmisores</span>
              <span className="stat-value">{winner.shields}</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">🧠</span>
            <div className="stat-content">
              <span className="stat-label">Plasticidad Cerebral</span>
              <span className="stat-value">Activada</span>
            </div>
          </div>
        </div>

        <p className="victory-message">
          ¡Felicidades! Has demostrado que el verdadero triunfo radica en el aprendizaje,
          el esfuerzo y el proceso. Tu cerebro es más sabio ahora. 🌟
        </p>

        <button className="btn btn-primary btn-large" onClick={onRestart}>
          🎮 Jugar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default GameOver;