// sockets/gameSocket.js
import { addQuestion, addPlayer, submitAnswer } from "../models/gameModel.js";

export function registerGameEvents(io, socket) {
  // Join a game room
  socket.on("joinRoom", async ({ gameCode, playerName }) => {
    try {
      socket.join(gameCode);
      socket.to(gameCode).emit("playerJoined", { playerName });
    } catch (err) {
      console.error("Error in joinRoom:", err);
      socket.emit("error", { message: "Failed to join game." });
    }
  });

  // Add a question
  socket.on("addQuestion", async ({ gameCode, question }) => {
    try {
      await addQuestion(gameCode, question);
      io.to(gameCode).emit("newQuestion", question);
    } catch (err) {
      console.error("Error in addQuestion:", err);
      socket.emit("error", { message: "Failed to add question." });
    }
  });

  socket.on("submitAnswer", async ({ gameCode, questionId, answer, playerId }) => {
    try {
      const updatedPlayerRes = await submitAnswer(gameCode, questionId, answer, playerId);
      // Broadcast updated score to all players
      io.to(gameCode).emit("playerScoreUpdated", {
        playerId,
        score: updatedPlayerRes.updatedPlayer.score,
        isCorrect: updatedPlayerRes.isCorrect,
      });
    } catch (err) {
      console.error("Error handling submitAnswer:", err);
      socket.emit("errorMessage", { message: "Failed to submit answer" });
    }
  });
}
