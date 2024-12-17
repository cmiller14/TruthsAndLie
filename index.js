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


// Game data
let gameData = {
    truth1: "I like to poop.",
    truth2: "I have climbed Mount Everest.",
    lie: "I have been to space."
};

// API endpoint to get game data
app.get('/api/game', (req, res) => {
    res.json(gameData);
});


// Listen for Socket.IO connections
io.on("connection", (socket) => {  
    // Listen for form data from the client
    socket.on("sendFormData", (formData) => {
      console.log("Received form data:", formData);
  
      // Optional: Emit back a success message
      socket.emit("formSubmissionResponse", { status: "success", message: "Form data received!" });
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
