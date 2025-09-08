import { createGame, addPlayer, addQuestion, getGame } from "../models/gameModel.js";

// Utility to generate a random game ID
function generateGameCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export const createGameController = async (req, res) => {
  try {
    // Generate a unique code
    let gameCode;
    let gameCreated = null;

    // Loop until we find an unused code (to avoid collisions)
    let tries = 0;
    do {
      gameCode = generateGameCode();
      gameCreated = await createGame(gameCode); // your model creates & saves the game
      tries++;
    } while (!gameCreated && tries < 5);

    if (!gameCreated) {
      return res.status(500).json({ error: "Failed to generate unique game code" });
    }

    res.status(201).json({
      success: true,
      gameId: gameCode,
      message: "Game created successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGameController = async (req, res) => {
  try {
    const { gameCode } = req.params;
    const game = await getGame(gameCode);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPlayerController = async (req, res) => {
  try {
    const { gameCode } = req.params;
    const { name } = req.body;

    console.log(gameCode);
    console.log(name);

    if (!name) return res.status(400).json({ error: "name is required" });

    await addPlayer(gameCode, { name });
    res.status(200).json({ message: "Player added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addQuestionController = async (req, res) => {
  try {
    const { gameCode } = req.params;
    const { text, createdBy } = req.body;

    if (!text) return res.status(400).json({ error: "text is required" });

    await addQuestion(gameCode, { text, createdBy });
    res.status(200).json({ message: "Question added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
