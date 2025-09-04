import express from "express";
import {
  createGameController,
  addPlayerController,
  addQuestionController,
  getGameController
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/games", createGameController); // GET /api/games
router.get("/games/:gameCode", getGameController); // GET /api/game/:gameCode
router.post("/games/:gameCode/players", addPlayerController); // POST /api/games/:gameCode/players
router.post("/games/:gameCode/questions", addQuestionController); // POST /api/games/:gameCode/questions

export default router;

