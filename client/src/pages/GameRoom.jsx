import React, { useState } from "react";

function GameRoom() {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;

    setQuestions([...questions, newQuestion.trim()]);
    setNewQuestion("");
    setShowModal(false);
  };

  return (
    <div className="landing-container">

     
    <div className="container py-5">
      <h1 className="text-center mb-4">🎲 Game Room</h1>

      {/* Add Question Button */}
      <div className="text-center mb-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowModal(true)}
        >
          ➕ Add Question
        </button>
      </div>

      {/* Questions List */}
      <div className="shadow-card">
        <h3 className="mb-3">Questions</h3>
        {questions.length === 0 ? (
          <p className="text-muted">No questions yet. Add one to get started!</p>
        ) : (
          <ul className="list-group">
            {questions.map((q, i) => (
              <li key={i} className="list-group-item">
                {q}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Question Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow-card">
              <div className="modal-header">
                <h5 className="modal-title">Add a Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Type your question here..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddQuestion}
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>   
  );
}

export default GameRoom;
