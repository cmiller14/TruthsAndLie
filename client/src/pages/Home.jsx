import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoinModal from "../components/JoinModal";
import CreateModal from "../components/CreateModal";
import { ApiContext } from "../utils/api";
const API_URL = import.meta.env.VITE_API_URL;



function Home() {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [gameCode, setGameCode] = useState("");
  const [createdCode, setCreatedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const api = useContext(ApiContext);
  const navigate = useNavigate();

  const handleJoin = async (code, playerName) => {
    try {
      const name = {
        name: playerName,
      }
      const res = await api.post(`${API_URL}/api/games/${code}/players`, name)
      const playerId = await res.id
      navigate(`/game/${code}`, { state: { playerName, playerId} });
    } catch (err) {
      console.error(err);
      alert("Failed to join game. Try again.");
    } finally {
      setShowJoin(false);
      setGameCode("");
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);            // show spinner immediately
    try {
      const res = await api.get(`${API_URL}/api/games`);
      if (res.success) {
        setCreatedCode(res.gameId);
        setShowCreate(true);
      }
    } catch (err) {
      console.error("Error creating game:", err);
      alert("Failed to create game. Try again.");
    } finally {
      setIsLoading(false);         // hide spinner once finished
    }
  };


  return (
    <div className="landing-container">
      <h1>Trivia Truth Trial</h1>
      <p>Test your knowledge, challenge your friends, and see who can uncover the truth!</p>

      <div className="d-flex gap-3">
        <button className="btn btn-primary btn-lg" onClick={() => setShowJoin(true)}>
          Join a Game
        </button>
        <button className="btn btn-success btn-lg" onClick={handleCreate}>
          Create a Game
        </button>
      </div>

      {isLoading && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-5 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 mb-0">Creating your game...</p>
            </div>
          </div>
        </div>
      )}


      <JoinModal
        show={showJoin}
        onClose={() => setShowJoin(false)}
        onJoin={handleJoin}
        gameCode={gameCode}
        setGameCode={setGameCode}
      />

      <CreateModal
        show={showCreate}
        onClose={() => setShowCreate(false)}
        createdCode={createdCode}
      />
    </div>
  );
}

export default Home;

