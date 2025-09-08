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

  const api = useContext(ApiContext);
  const navigate = useNavigate();

  const handleJoin = async (code, playerName) => {
    try {
      const name = {
        name: playerName,
      }
      const res = api.post(`${API_URL}/api/games/${code}/players`, name)

      navigate(`/game/${code}`, { state: { playerName } });
    } catch (err) {
      console.error(err);
      alert("Failed to join game. Try again.");
    } finally {
      setShowJoin(false);
      setGameCode("");
    }
  };

  const handleCreate = async () => {
    try {
      const res = await api.get(`${API_URL}/api/games`);
      if (res.success) {
        setCreatedCode(res.gameId);
        setShowCreate(true);
      }
    } catch (err) {
      console.error("Error creating game:", err);
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

