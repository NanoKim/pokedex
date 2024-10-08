import PokemonForm from "./components/PokemonSummonForm";
import PokemonShare from "./components/PokemonShare";
import PokemonList from "./components/PokemonList";
import PokemonBox from "./components/PokemonBox";
import PokemonDetail from "./view/PokemonDetail";
import Header from "./view/Header";

import { AuthProvider } from "./hooks/UserContext";
import { DarkProvider } from "./hooks/DarkContext";
import { LangProvider } from "./hooks/LangContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="dark:bg-gray-800">
      <LangProvider>
        <DarkProvider>
          <AuthProvider>
            <div className="App max-w-6xl mx-auto font-sanss2 dark:bg-gray-700 shadow-md text-gray-700">
              <Header />
              <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/poke-box" element={<PokemonBox />} />
                <Route path="/poke-custom" element={<PokemonForm />} />
                <Route path="/detail/*" element={<PokemonDetail />} />
                <Route path="/share/*" element={<PokemonShare />} />
              </Routes>
            </div>
          </AuthProvider>
        </DarkProvider>
      </LangProvider>
    </div>
  );
}

export default App;