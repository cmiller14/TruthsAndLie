// sockets/gameSocket.js
import { addQuestion, addPlayer } from "../models/gameModel.js";

export function registerGameEvents(io, socket) {
  // Join a game room
  socket.on("joinRoom", async ({ gameCode, playerName }) => {
    try {
      socket.join(gameCode);

      await addPlayer(gameCode, { name: playerName });

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
}
