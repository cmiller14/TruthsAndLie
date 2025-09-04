import React from "react";
import { useNavigate } from "react-router-dom";

function CreateModal({ show, onClose, createdCode }) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleGoToGame = () => {
    onClose();
    navigate(`/game/${createdCode}`);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-card">
          <div className="modal-header">
            <h5 className="modal-title">Game Created!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body text-center">
            <p>Share this code with your friends:</p>
            <h3 className="fw-bold">{createdCode}</h3>
          </div>

          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleGoToGame}>
              Go to Game Room
            </button>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
