import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import i18n from "./i18n/I18n";
import React from "react";
import App from "./App";
import "./index.css";

import { PokeProvider } from "./hooks/PokemonContext";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n(window.navigator.language)}>
      <PokeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokeProvider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();