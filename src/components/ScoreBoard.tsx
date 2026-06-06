import React from 'react';
import '../styles/ScoreBoard.css';

interface Player {
  id: string;
  name: string;
  avatar: string;
  position: number;
  medals: number;
  shields: number;
}

interface ScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">📊 Marcador</h2>
      <div className="scoreboard-players">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`scoreboard-item ${index === currentPlayerIndex ? 'active' : ''}`}
          >
            <div className="player-rank">
              <span className="avatar">{player.avatar}</span>
              <span className="name">{player.name}</span>
            </div>
            <div className="player-progress">
              <div className="position-bar">
                <div
                  className="position-fill"
                  style={{ width: `${(player.position / 39) * 100}%` }}
                />
              </div>
              <span className="position-text">{player.position}/39</span>
            </div>
            <div className="rewards">
              <span className="medals" title="Medallas">
                🏅 {player.medals}/3
              </span>
              <span className="shields" title="Escudos">
                🛡️ {player.shields}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
