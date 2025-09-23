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

  // Fetch questions subcollection
  const questionSnap = await gameRef.collection("questions").get();
  const questions = questionSnap.docs.map(doc => doc.data());

  return {
    ...gameData,
    players,
    questions,
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

export async function submitAnswer(gameCode, questionId, answer, playerId) {
  const gameRef = db.collection("games").doc(gameCode);
  const questionRef = gameRef.collection("questions").doc(questionId);
  const playerRef = gameRef.collection("players").doc(playerId);

  // Fetch question
  const questionSnap = await questionRef.get();
  if (!questionSnap.exists) {
    throw "Question not found!";
  }
  const question = questionSnap.data();

  // Check if player already answered
  if (question.answeredBy?.includes(playerId)) {
    throw "You already answered this question"
  }

  // Determine if answer is correct
  const isCorrect = answer === question.answers.truth;

  if (isCorrect) {
    await playerRef.update({
      score: admin.firestore.FieldValue.increment(10),
    });
  }

  // Mark player as having answered
  await questionRef.update({
    answeredBy: admin.firestore.FieldValue.arrayUnion(playerId),
  });

  // Fetch updated player
  const playerSnap = await playerRef.get();
  const updatedPlayer = playerSnap.data();
  return {updatedPlayer, isCorrect};
}

export async function addQuestion(gameCode, question) {
  const questionId = uuidv4();
  const questionsRef = db
    .collection("games")
    .doc(gameCode)
    .collection("questions")
    .doc(questionId);

  // Shuffle the answers but keep the key structure
  question.answers = shuffleObject(question.answers);

  const questionData = {
    id: questionId,
    ...question,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    answeredBy: [],
  };

  // Write to Firestore
  await questionsRef.set(questionData);

  // Return the local version (note: createdAt is still a FieldValue here)
  return questionData;
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
