// controllers/socketController.js
import { registerGameEvents } from "../sockets/gameSocket.js";
import { registerChatEvents } from "../sockets/chatSocket.js";

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Register different domains
    registerGameEvents(io, socket);
    registerChatEvents(io, socket);

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
