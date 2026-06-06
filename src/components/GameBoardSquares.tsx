import React from 'react';
import '../styles/GameBoardSquares.css';

interface Player {
  id: string;
  name: string;
  avatar: string;
  position: number;
  medals: number;
  shields: number;
}

interface GameBoardSquaresProps {
  boardSize: number;
  players: Player[];
  getSquareInfo: (position: number) => any;
}

const GameBoardSquares: React.FC<GameBoardSquaresProps> = ({
  boardSize,
  players,
  getSquareInfo,
}) => {
  const squares = Array.from({ length: boardSize }, (_, i) => i);

  const getPlayersOnSquare = (position: number) => {
    return players.filter(p => p.position === position);
  };

  return (
    <div className="board-grid">
      {squares.map(position => {
        const squareInfo = getSquareInfo(position);
        const playersOnSquare = getPlayersOnSquare(position);

        return (
          <div
            key={position}
            className={`board-square square-${position} ${squareInfo.type}`}
            style={{ backgroundColor: squareInfo.color }}
          >
            <div className="square-info">
              <span className="square-number">{position}</span>
              <span className="square-emoji">{squareInfo.emoji}</span>
            </div>

            {playersOnSquare.length > 0 && (
              <div className="players-on-square">
                {playersOnSquare.map(player => (
                  <div key={player.id} className="player-token" title={player.name}>
                    {player.avatar}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoardSquares;