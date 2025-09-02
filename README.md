# Trivia Game Web App 🎮

## Overview
This is a real-time web application where players can create and join game rooms to play trivia together.  
Each game room has its own set of players and questions, allowing groups of friends, coworkers, or classrooms to host their own trivia sessions.

---

## Features
- **Game Room Creation**  
  - A host can generate a unique game room code.  
  - Players can join using the room code.  

- **Player Participation**  
  - Players enter a username when joining.  
  - All connected players are displayed in the room.  

- **Custom Questions**  
  - Each player can contribute their own trivia questions to the shared pool.  
  - Questions are stored and randomized for gameplay.  

- **Trivia Gameplay (planned)**  
  - Players take turns answering questions.  
  - Points are awarded for correct answers.  
  - A leaderboard displays scores in real time.  

---

## Tech Stack
- **Frontend**: React + Vite  
- **Backend**: Node.js + Express  
- **Real-time Communication**: Socket.IO  
- **State Management**: TBD (React hooks or Redux)  

---

## Getting Started

### Prerequisites
- Node.js (>= 18)
- npm or yarn

### Installation
```bash
# Clone the repo

# cd into both server and client folders

# Install dependencies
yarn install 

# run servers
yarn dev
