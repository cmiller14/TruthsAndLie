// GameRoom.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../utils/api";
const API_URL = import.meta.env.VITE_API_URL;

function GameRoom() {
  const { gameCode } = useParams(); // get from /game/:gameCode
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const api = useContext(ApiContext);

  // Fetch game from backend
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`${API_URL}/api/games/${gameCode}`);
        console.log(res);

        if (res.id) {
          setGame(res);
        } else {
          console.error("Error fetching game:", res);
        }
      } catch (err) {
        console.error("Request failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameCode]);

  // Add question locally for now (can be wired to backend later)
  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;

    setGame({
      ...game,
      questions: [...(game.questions || []), { text: newQuestion.trim() }],
    });

    setNewQuestion("");
    setShowModal(false);
  };

  if (loading) return <p className="text-center mt-5">Loading game...</p>;
  if (!game) return <p className="text-center mt-5">Game not found</p>;

  return (
    <div className="landing-container">
      <div className="container py-5">
        <h1 className="text-center mb-4">🎲 Game Room: {game.id}</h1>

        {/* Players List */}
        <div className="shadow-card mb-4">
          <h3 className="mb-3">Players</h3>
          {game.players?.length === 0 ? (
            <p className="text-muted">No players have joined yet.</p>
          ) : (
            <ul className="list-group">
              {game.players.map((p, i) => (
                <li key={i} className="list-group-item">
                  {p.name || "Unnamed Player"} — Score: {p.score}
                </li>
              ))}
            </ul>
          )}
        </div>

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
          {game.questions?.length === 0 ? (
            <p className="text-muted">No questions yet. Add one to get started!</p>
          ) : (
            <ul className="list-group">
              {game.questions.map((q, i) => (
                <li key={i} className="list-group-item">
                  {q.text || q}
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
                  <button className="btn btn-primary" onClick={handleAddQuestion}>
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
