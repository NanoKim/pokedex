import { useContext } from "react";
import { firestore } from "../api/firebase"; // Firestore 가져오기
import { AuthContext } from "../hooks/UserContext";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const CapturedPokemons = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  // 사용자가 로그인하지 않은 경우 처리
  if (!userId) {
    return { value: null, loading: false, error: null, capturedPokemonList: [] };
  }

  const pokemonCollection = collection(firestore, "pokemon");
  const q = query(pokemonCollection, where("uid", "==", userId));

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const capturedPokemonList = value?.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) || [];

  return { value, loading, error, capturedPokemonList };
};
