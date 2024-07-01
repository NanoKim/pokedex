import { firestore } from "../api/firebase"; // Firestore 인스턴스 가져오기
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export async function savePokemon({ pokemonId, imgUrl, uid, type }) {
  try {
    await addDoc(collection(firestore, "pokemon"), {
      pokemonId,
      imgUrl,
      uid,
      type,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

export async function releasePokemon(id) {
  try {
    await deleteDoc(doc(firestore, "pokemon", id));
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}
