// sockets/chatSocket.js
export function registerChatEvents(io, socket) {
  socket.on("sendMessage", ({ gameCode, playerName, message }) => {
    io.to(gameCode).emit("newMessage", { playerName, message });
  });
}
