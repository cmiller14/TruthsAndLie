// controllers/socketController.js
import { registerGameEvents } from "../sockets/gameSocket.js";
import { registerChatEvents } from "../sockets/chatSocket.js";

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    // Register different domains
    registerGameEvents(io, socket);
    registerChatEvents(io, socket);

    // Handle disconnect
    socket.on("disconnect", () => {
    });
  });
}
