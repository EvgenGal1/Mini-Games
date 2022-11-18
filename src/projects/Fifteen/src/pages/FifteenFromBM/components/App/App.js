import React from "react";

import Header from "../Header/Header";
import Tiles from "./../Tiles/Tiles";
import UndoRedo from "./../UndoRedo/UndoRedo";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <Tiles />
          <UndoRedo />
        </div>
      </div>
    );
  }
}

export default App;
