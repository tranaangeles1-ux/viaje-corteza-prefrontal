import React, { useState, useEffect } from 'react';
import '../styles/ChallengeModal.css';
import { CHALLENGES } from '../data/challenges';

interface ChallengeModalProps {
  square: any;
  onComplete: (success: boolean) => void;
  onClose: () => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ square, onComplete, onClose }) => {
  const [challenge, setChallenge] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const categoryChallenges = CHALLENGES[square.category as keyof typeof CHALLENGES];
    if (categoryChallenges) {
      const randomChallenge = categoryChallenges[
        Math.floor(Math.random() * categoryChallenges.length)
      ];
      setChallenge(randomChallenge);
    }
  }, [square]);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === challenge.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  if (!challenge) {
    return <div className="challenge-modal">Cargando desafío...</div>;
  }

  return (
    <div className="challenge-modal-overlay">
      <div className="challenge-modal">
        <div className="modal-header" style={{ backgroundColor: square.color }}>
          <h2>{square.name}</h2>
          <p className="challenge-category">{square.emoji} {square.name}</p>
        </div>

        <div className="modal-content">
          {!showResult ? (
            <>
              <div className="challenge-question">
                <h3>{challenge.question}</h3>
              </div>

              <div className="challenge-answers">
                {challenge.answers.map((answer: string, index: number) => (
                  <button
                    key={index}
                    className={`answer-btn ${selectedAnswer === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerClick(index)}
                  >
                    <span className="answer-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="answer-text">{answer}</span>
                  </button>
                ))}
              </div>

              <div className="challenge-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                >
                  Enviar Respuesta
                </button>
              </div>
            </>
          ) : (
            <div className={`result-display ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-icon">
                {isCorrect ? '🎉' : '📚'}
              </div>
              <h3>
                {isCorrect ? '¡Correcto!' : 'Intenta de nuevo'}
              </h3>
              <p>
                {isCorrect
                  ? '¡Ganaste una Medalla de Plasticidad Cerebral!'
                  : 'No te desanimes, ¡la próxima lo lograrás!'}
              </p>
              <p className="challenge-explanation">{challenge.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;