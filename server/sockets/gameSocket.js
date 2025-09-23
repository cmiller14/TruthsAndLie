// sockets/gameSocket.js
import { addQuestion, addPlayer, submitAnswer } from "../models/gameModel.js";
import gameRegistry from '../models/GameRegistry.js';

export function registerGameEvents(io, socket) {
  // Join a game room
  socket.on("joinRoom", async ({ gameCode, playerId, playerName }) => {
  try {
    socket.join(gameCode);

    // Get or create the game object
    const game = gameRegistry.getGame(gameCode);

    // Check if player already exists
    if (!game.hasPlayer(playerId)) {
      game.addPlayer(playerId);

      // Notify others only if it's a new player
      socket.to(gameCode).emit("playerJoined", { playerName });
    } else {
      console.log(`Player ${playerId} already in game ${gameCode}`);
    }

  } catch (err) {
    console.error("Error in joinRoom:", err);
    socket.emit("error", { message: "Failed to join game." });
  }
});

  // Add a question
  socket.on("addQuestion", async ({ gameCode, question }) => {
    try {
      const questionData = await addQuestion(gameCode, question);
      io.to(gameCode).emit("newQuestion", questionData);
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
