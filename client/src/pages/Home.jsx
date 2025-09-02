import { useState } from "react";
import JoinModal from "../components/JoinModal";
import CreateModal from "../components/CreateModal";



function Home() {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [gameCode, setGameCode] = useState("");
  const [createdCode, setCreatedCode] = useState("");

  const handleJoin = () => {
    alert(`Joining game with code: ${gameCode}`);
    setShowJoin(false);
    setGameCode("");
  };

  const handleCreate = () => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCreatedCode(code);
    setShowCreate(true);
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

