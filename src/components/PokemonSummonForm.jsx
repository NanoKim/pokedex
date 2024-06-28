import { useContext, useState } from "react";
import { useGenerateNumber } from "../hooks/useGenerateNumber";
import { PokemonContext } from "../hooks/PokemonContext";
import { AuthContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import tw from "tailwind-styled-components";
import axios from "axios";
import ToggleDark from "../elements/ToggleDark";
import ToggleLang from "../elements/ToggleLang";

const PokemonForm = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [pokemonName, setPokemonName] = useState();
  const [pokemon, setPokemon] = useState({});
  const num_Shiny = useGenerateNumber(1, 10);
  const num = useGenerateNumber(1, 898);
  const { captureFB } = useContext(PokemonContext);
  const { user } = useContext(AuthContext);
  const handleNameOnChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const callPokemon = () => {
    if (!user) return alert(t("log_in_and_capture_pokemons"));
    if (!pokemonName) return alert(t("type_anything_and_press_enter"));
    try {
      setTimeout(async () => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${num}/`
        );

        const id = response.data.id;
        if (num_Shiny > 6) {
          const img = response.data.sprites.front_shiny;
          alert(t("getShiny"));
          setPokemon({ id, img, type: 1 });
        } else {
          const img = response.data.sprites.front_default;
          setPokemon({ id, img, type: 0 });
        }
      }, 100);
    } catch (error) {
      alert("실패");
    }
  };

  return (
    <>
      <div className="flex flex-row p-3 gap-3 bg-amber-400 dark:bg-amber-900">
        <ToggleDark />
        <ToggleLang />
      </div>
      <FlexBox>
        <h1 className="text-4xl dark:text-white uppercase">
          {t("random_pokemon_summon")}
        </h1>
        <p className="text-xl dark:text-white p-5">
          {t("type_anything_and_press_enter")}
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col md:flex-row justify-center items-center"
        >
          <input
            type="text"
            placeholder={t("here")}
            className="ring-2 ring-yellow-400 outline-none"
            onChange={handleNameOnChange}
          />
          <button
            onClick={callPokemon}
            className="rounded-md dark:text-white ml-3 border hover:bg-amber-400 active:bg-amber-600 hover:text-white opacity-0 md:opacity-100"
          >
            {t("type_random_text")}
          </button>
        </form>
        {pokemon && pokemon.id && (
          <div className="mx-auto flex flex-col justify-center items-center">
            <img
              src={pokemon?.img}
              alt=""
              className="animate-bounce object-contain max-w-fit"
            />
            <p className="text-2xl dark:text-white">???</p>
            <CatchButton onClick={() => navigate("/poke-box")}>
              <div
                onClick={captureFB({
                  pokemonId: pokemon?.id,
                  imgUrl: pokemon?.img,
                  uid: user?.uid,
                  type: pokemon?.type,
                })}
              >
                {t("just_capture")}
              </div>
            </CatchButton>
          </div>
        )}
      </FlexBox>
    </>
  );
};

export default PokemonForm;

const CatchButton = tw.button`
 border text-sm rounded-md hover:bg-blue-300 hover:text-white px-1 mx-1 lg:px-0 lg:mx-0
 hover:border-blue-300 active:bg-yellow-200 active:border-yellow-200 dark:text-white
`;

const FlexBox = tw.div`
flex justify-center items-center flex-col gap-7 w-full h-screen
`;