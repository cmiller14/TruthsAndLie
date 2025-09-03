import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../config/firebase.js";

export async function createGame(gameCode) {
  const gameRef = doc(db, "games", gameCode);
  const newGame = {
    id: gameCode,
    questions: [],
    players: [],
    createdAt: new Date(),
  };
  await setDoc(gameRef, newGame);
  return newGame;
}

export async function addPlayer(gameCode, player) {
  const gameRef = doc(db, "games", gameCode);
  await updateDoc(gameRef, {
    players: arrayUnion({
      ...player,
      score: 0,
      joinedAt: new Date(),
    }),
  });
}

export async function addQuestion(gameCode, question) {
  const gameRef = doc(db, "games", gameCode);
  await updateDoc(gameRef, {
    questions: arrayUnion({
      ...question,
      createdAt: new Date(),
    }),
  });
}
