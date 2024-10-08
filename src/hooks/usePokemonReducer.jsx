import _ from "lodash";

import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS } from "./actions";
import { useReducer } from "react";

const getCapturedPokemons = (capturedPokemons, releasedPokemon) =>
  _.filter(capturedPokemons, (pokemon) => pokemon !== releasedPokemon);

const releasePokemon = (releasedPokemon, state) => ({
  pokemons: [...state.pokemons, releasedPokemon],
  capturedPokemons: getCapturedPokemons(
    state.capturedPokemons,
    releasedPokemon
  ),
});

const getPokemonsList = (pokemons, capturedPokemon) =>
  pokemons.filter((pokemon) => pokemon !== capturedPokemon);

const capturePokemon = (pokemon, state) => ({
  pokemons: getPokemonsList(state.pokemons, pokemon),
  capturedPokemons: [...state.capturedPokemons, pokemon],
});

const addPokemon = (pokemon, state) => ({
  pokemons: _.uniq([...state.pokemons, pokemon]),
  capturedPokemons: state.capturedPokemons,
});

const addPokemons = (poke, state) => ({
  pokemons: _.uniq(
    [...state.pokemons, ...poke].sort(() => Math.random() - 0.5)
  ),
  capturedPokemons: state.capturedPokemons,
});

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case CAPTURE:
      return capturePokemon(action.pokemon, state);
    case RELEASE:
      return releasePokemon(action.pokemon, state);
    case ADD_POKEMON:
      return addPokemon(action.pokemon, state);
    case ADD_POKEMONS:
      return addPokemons(action.pokemons, state);
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemons: [],
    capturedPokemons: [],
  });