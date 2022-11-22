import React, { useState, useEffect } from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { ActionCreators } from "redux-undo";
import rootReducer from "./FifteenFromBM/store/reducers";

import App from "./FifteenFromBM/components/App/App";
import {
  loadState,
  saveState,
  clearState,
} from "./FifteenFromBM/store/localStorage";

import "./FifteenFromBM.scss";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

// clear history at begin
store.dispatch(ActionCreators.clearHistory());

store.subscribe(() => {
  const state = store.getState();

  if (state.present.win || !state.present.started) {
    clearState();
  } else {
    saveState(state);
  }
});

export const FifteenFromBM = () => {
  return (
    <Provider store={store}>
      <div className="FifteenFromBM">
        <div className="FifteenFromBM__descript"></div>
        <div className="FifteenFromBM__content">
          <App />
        </div>
      </div>
    </Provider>
  );
};
// export { FifteenFromBM };
