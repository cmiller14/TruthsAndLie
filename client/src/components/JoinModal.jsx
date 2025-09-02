import React from "react";

function JoinModal({ show, onClose, onJoin, gameCode, setGameCode }) {
  if (!show) return null; // Don't render if not visible

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
            <button className="btn btn-primary" onClick={onJoin}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
