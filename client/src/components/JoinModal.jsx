import React, { useState } from "react";

function JoinModal({ show, onClose, onJoin, gameCode, setGameCode }) {
  const [playerName, setPlayerName] = useState("");

  if (!show) return null; // Don't render if not visible

  const handleJoin = () => {
    if (!gameCode.trim() || !playerName.trim()) return;
    onJoin(gameCode, playerName);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-card">
          <div className="modal-header">
            <h5 className="modal-title">Join a Game</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter game code"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleJoin}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;

