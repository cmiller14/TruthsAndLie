// This file holds all active games in memory.
// You can import it anywhere in your backend.

class Game {
  constructor(gameCode) {
    this.gameCode = gameCode;
    this.players = new Set(); // holds player IDs
  }

  addPlayer(playerId) {
    this.players.add(playerId);
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
  }

  hasPlayer(playerId) {
    return this.players.has(playerId);
  }

  getPlayers() {
    return Array.from(this.players);
  }
}

class GameRegistry {
  constructor() {
    this.games = new Map(); // Map<gameCode, Game>
  }

  getGame(gameCode) {
    if (!this.games.has(gameCode)) {
      this.games.set(gameCode, new Game(gameCode));
    }
    return this.games.get(gameCode);
  }

  removeGame(gameCode) {
    this.games.delete(gameCode);
  }
}

// export a single instance
const gameRegistry = new GameRegistry();
export default gameRegistry;
