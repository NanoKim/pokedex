import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { AuthContext } from "../hooks/UserContext";
import { firestore } from "../api/firebase";
import { useContext } from "react";

export const CapturedPokemons = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

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
