// server/index.js
import express, { json } from 'express';
import { Server } from "socket.io";
import cors from 'cors';
import { createServer } from "http";
import gameRoutes from "./routes/gameRoutes.js";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server);


app.use("/api", gameRoutes);


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
