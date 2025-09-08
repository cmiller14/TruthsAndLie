// server/index.js
import express, { json } from 'express';
import { Server } from "socket.io";
import cors from 'cors';
import { createServer } from "http";
import gameRoutes from "./routes/gameRoutes.js";
import 'dotenv/config'; 
import { registerSocketHandlers } from "./controllers/socketController.js";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL, // frontend URL
    methods: ["GET", "POST"],
  },
});

// handle the http requests
app.use("/api", gameRoutes);
// handle the socket requests and connetions
registerSocketHandlers(io);
  
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
