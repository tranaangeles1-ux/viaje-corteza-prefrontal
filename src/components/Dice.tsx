import React, { useState } from 'react';
import '../styles/Dice.css';

interface DiceProps {
  onRoll: (result: number) => void;
  isRolling: boolean;
  result: number;
}

const Dice: React.FC<DiceProps> = ({ onRoll, isRolling, result }) => {
  const handleClick = () => {
    if (isRolling) return;
    const diceResult = Math.floor(Math.random() * 6) + 1;
    onRoll(diceResult);
  };

  return (
    <div className="dice-container">
      <div className={`dice ${isRolling ? 'rolling' : ''}`} onClick={handleClick}>
        <div className="dice-face">
          {result > 0 ? result : '?'}
        </div>
      </div>
      <p className="dice-label">
        {isRolling ? 'Rodando...' : 'Haz clic para tirar el dado'}
      </p>
      {result > 0 && !isRolling && (
        <p className="dice-result">¡Avanzas {result} casillas!</p>
      )}
    </div>
  );
};

export default Dice;