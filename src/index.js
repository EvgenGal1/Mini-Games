import "./styles/styles.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { App } from "./projects/App.jsx";

import "./index.css";

// Для MatSz 2048
import createStoreMS2048 from "./projects/Block2048/src/pages/MatSz/store/store.ts";

const storeMS2048 = createStoreMS2048();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={storeMS2048}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
