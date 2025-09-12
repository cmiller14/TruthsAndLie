import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ApiContext } from "../utils/api";
import { io } from "socket.io-client";
import PlayersList from "../components/PlayerList";
import QuestionsList from "../components/QuestionsList";
import AddQuestionModal from "../components/AddQuestionModal";

const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL;

function GameRoom() {
  const { gameCode } = useParams();
  const location = useLocation();
  const playerName = location.state?.playerName || "Anonymous";

  const api = useContext(ApiContext);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState(null);
  const [questionData, setQuestionData] = useState({
    text: "",
    answers: {"truth":"", "false1":"", "false2":""}, // truth, false1, false2
  });

  // Fetch initial game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`${API_URL}/api/games/${gameCode}`);
        console.log(res);
        if (res.id) setGame(res);
        else console.error("Game not found:", res);
      } catch (err) {
        console.error("Failed to fetch game:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [api, gameCode]);

  // Initialize socket connection
  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);

    s.emit("joinRoom", { gameCode, playerName });

    s.on("newQuestion", (question) => {
      setGame((prev) => ({
        ...prev,
        questions: [...(prev.questions || []), question],
      }));
    });

    s.on("playerJoined", ({ playerName }) => {
      setGame((prev) => ({
        ...prev,
        players: [...(prev.players || []), { name: playerName, score: 0 }],
      }));
    });

    s.on("playerScoreUpdated", ({ playerId, score, isCorrect }) => {
    setGame((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, score } : p
      ),
    }));
  });

    return () => s.disconnect();
  }, [gameCode, playerName]);

  const handleAddQuestion = () => {
    if (!questionData.text.trim() || !socket) return;

    const questionObj = {
      ...questionData,
      author: playerName,
    };

    socket.emit("addQuestion", { gameCode, question: questionObj });

    // Reset form
    setQuestionData({ text: "", answers: {"truth":"", "false1":"", "false2":""} });
    setShowModal(false);
  };

  if (loading) return <p className="text-center mt-5">Loading game...</p>;
  if (!game) return <p className="text-center mt-5">Game not found</p>;

  return (
    <div className="landing-container">
      <div className="container py-5">
        <h1 className="text-center mb-4">🎲 Game Room: {game.id}</h1>

        <PlayersList players={game.players} />

        <div className="text-center mb-4">
          <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>
            ➕ Add Question
          </button>
        </div>

        <QuestionsList
          questions={game.questions}
          onSubmitAnswer={(qIndex, answer) => {
            console.log(qIndex);
            console.log(answer);
            console.log(playerName);
            
            // Example: send through socket
            socket.emit("submitAnswer", {
              gameCode,
              questionIndex: qIndex,
              answer,
              playerName,
            });
          }}
        />

        <AddQuestionModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAddQuestion}
          questionData={questionData}
          setQuestionData={setQuestionData}
        />
      </div>
    </div>
  );
}

export default GameRoom;
