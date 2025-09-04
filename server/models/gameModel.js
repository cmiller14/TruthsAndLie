import { db } from "../config/firebase.js";

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
        players: [],
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    };

    await gameRef.set(newGame);
    return newGame;
}

export async function addPlayer(gameCode, player) {
  const gameRef = db.collection("games").doc(gameCode);

  await gameRef.update({
    players: admin.firestore.FieldValue.arrayUnion({
      ...player,
      score: 0,
      joinedAt: new Date(),
    }),
  });
}

export async function addQuestion(gameCode, question) {
  const gameRef = db.collection("games").doc(gameCode);

  await gameRef.update({
    questions: admin.firestore.FieldValue.arrayUnion({
      ...question,
      createdAt: new Date(),
    }),
  });
}