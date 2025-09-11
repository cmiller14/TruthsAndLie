import { db } from "../config/firebase.js";
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

export async function getGame(gameCode) {
  const gameRef = db.collection("games").doc(gameCode);
  const snapshot = await gameRef.get();

  if (!snapshot.exists) return null;

  const gameData = snapshot.data();

  // 🔹 Fetch players subcollection
  const playersSnap = await gameRef.collection("players").get();
  const players = playersSnap.docs.map(doc => doc.data());

  return {
    ...gameData,
    players, // attach players array
  };
}

export async function createGame(gameCode) {
    const gameRef = db.collection("games").doc(gameCode);

    // Check if game already exists
    const existing = await gameRef.get();
    if (existing.exists) {
        return null; // let controller retry with a new code
    }

    const newGame = {
        id: gameCode,
        questions: [],
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    };

    await gameRef.set(newGame);
    return newGame;
}

export async function addPlayer(gameCode, player) {
  const playerId = uuidv4(); // unique player id

  const playerRef = db
    .collection("games")
    .doc(gameCode)
    .collection("players")
    .doc(playerId);

  await playerRef.set({
    id: playerId,
    ...player,
    score: 0,
    joinedAt: new Date(),
  });

  return playerId;
}

export async function addQuestion(gameCode, question) {
  const gameRef = db.collection("games").doc(gameCode);
  question.answers = shuffleObject(question.answers);
  await gameRef.update({
    questions: admin.firestore.FieldValue.arrayUnion({
      ...question,
      createdAt: new Date(),
    }),
  });
}

function shuffleObject(obj) {
  // Get all keys
  const keys = Object.keys(obj);

  // Shuffle keys (Fisher–Yates)
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  // Build a new object with shuffled key order
  const shuffled = {};
  keys.forEach((key) => {
    shuffled[key] = obj[key];
  });

  return shuffled;
}
