import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.tsx';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_ES from "./dictionary/ES/global.json"
import global_EN from "./dictionary/EN/global.json"
import global_PT from "./dictionary/PT/global.json"

i18next.init({
  interpolation: { escapeValue: false },
  lng: "EN",
  fallbackLng: "EN",
  resources:{
    EN: { global: global_EN },
    ES: { global: global_ES },
    PT: { global: global_PT }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
