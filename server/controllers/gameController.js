import { createGame, addPlayer, addQuestion } from "../models/gameModel.js";

export const createGameController = async (req, res) => {
  try {
    const { gameCode } = req.body;
    if (!gameCode) return res.status(400).json({ error: "gameCode is required" });

    const game = await createGame(gameCode);
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPlayerController = async (req, res) => {
  try {
    const { gameCode } = req.params;
    const { name } = req.body;

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
