import React from "react";

function CreateModal({ show, onClose, createdCode }) {
  if (!show) return null; // Don’t render if not visible

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
