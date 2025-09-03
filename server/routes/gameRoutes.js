import express from "express";
import {
  createGameController,
  addPlayerController,
  addQuestionController,
} from "../controllers/gameController.js";

const router = express.Router();

router.post("/games", createGameController); // POST /api/games
router.post("/games/:gameCode/players", addPlayerController); // POST /api/games/:gameCode/players
router.post("/games/:gameCode/questions", addQuestionController); // POST /api/games/:gameCode/questions

export default router;

