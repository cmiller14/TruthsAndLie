// server/index.js
const express = require('express');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');
const http = require("http");
const PORT = 3001;
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from Vite
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    credentials: true, // If using cookies/auth
};


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// API endpoint to get game data
app.get('/api/game', (req, res) => {
    res.json(gameData);
});


// Listen for Socket.IO connections
io.on("connection", (socket) => {  
    // Listen for form data from the client
    socket.on("sendStatements", (formData) => {
      console.log("Received statements data:", formData);
  
      socket.emit("recievedStatement", "The statement was recieved.")
      // emit the question to all other clients
      socket.broadcast.emit("newStatement", formData);
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
