import React, { useState } from 'react';
import '../styles/AvatarSelection.css';

interface Player {
  id: string;
  name: string;
  avatar: string;
  position: number;
  medals: number;
  shields: number;
}

interface AvatarSelectionProps {
  onAvatarsSelected: (players: Player[]) => void;
}

const AVATARS = [
  { id: '1', name: 'Neuron', emoji: '🧠' },
  { id: '2', name: 'DNA', emoji: '🧬' },
  { id: '3', name: 'Rocket', emoji: '🚀' },
  { id: '4', name: 'Wizard', emoji: '🧙' },
  { id: '5', name: 'Knight', emoji: '⚔️' },
  { id: '6', name: 'Phoenix', emoji: '🔥' },
  { id: '7', name: 'Dolphin', emoji: '🐬' },
  { id: '8', name: 'Eagle', emoji: '🦅' },
];

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onAvatarsSelected }) => {
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([]);
  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});

  const handleAvatarSelect = (avatarId: string) => {
    if (selectedAvatars.includes(avatarId)) {
      setSelectedAvatars(selectedAvatars.filter(id => id !== avatarId));
      const newNames = { ...playerNames };
      delete newNames[avatarId];
      setPlayerNames(newNames);
    } else {
      if (selectedAvatars.length < 4) {
        setSelectedAvatars([...selectedAvatars, avatarId]);
      }
    }
  };

  const handleNameChange = (avatarId: string, name: string) => {
    setPlayerNames({ ...playerNames, [avatarId]: name });
  };

  const handleStartGame = () => {
    if (selectedAvatars.length < 2) {
      alert('Se necesitan al menos 2 jugadores para jugar');
      return;
    }

    const players = selectedAvatars.map((avatarId, index) => {
      const avatar = AVATARS.find(a => a.id === avatarId);
      const name = playerNames[avatarId] || `Jugador ${index + 1}`;
      return {
        id: avatarId,
        name,
        avatar: avatar?.emoji || '🧠',
        position: 0,
        medals: 0,
        shields: 0,
      };
    });

    onAvatarsSelected(players);
  };

  const selectedPlayers = selectedAvatars.map(id => {
    const avatar = AVATARS.find(a => a.id === id);
    return { id, ...avatar };
  });

  return (
    <div className="avatar-selection">
      <div className="title-section">
        <h1>🧠 Viaje a la Corteza Prefrontal</h1>
        <p>¡Elige tu avatar y prepárate para activar tu plasticidad cerebral!</p>
        <span className="subtitle">Selecciona entre 2 y 4 jugadores</span>
      </div>

      <div className="avatars-grid">
        {AVATARS.map(avatar => (
          <div
            key={avatar.id}
            className={`avatar-card ${selectedAvatars.includes(avatar.id) ? 'selected' : ''}`}
            onClick={() => handleAvatarSelect(avatar.id)}
          >
            <span className="avatar-icon">{avatar.emoji}</span>
            <div className="avatar-name">{avatar.name}</div>
          </div>
        ))}
      </div>

      {selectedAvatars.length > 0 && (
        <div className="selected-players">
          <h3>✨ Jugadores Seleccionados ({selectedAvatars.length})</h3>
          <div className="players-list">
            {selectedPlayers.map((player, index) => (
              <div key={player.id} className="player-item">
                <div>
                  <span className="player-avatar-icon">{player.emoji}</span>
                  <div className="player-info">
                    <input
                      type="text"
                      placeholder={`Nombre Jugador ${index + 1}`}
                      value={playerNames[player.id] || ''}
                      onChange={e => handleNameChange(player.id, e.target.value)}
                      className="player-name-input"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-remove"
                  onClick={() => handleAvatarSelect(player.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleStartGame}>
          🎮 Comenzar Juego
        </button>
      </div>
    </div>
  );
};

export default AvatarSelection;
