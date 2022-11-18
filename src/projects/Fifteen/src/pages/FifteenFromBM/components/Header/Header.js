import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { doNewGame, doReset } from "./../../store/actions";

import "./Header.css";

const Header = ({ onNewGameClick, onResetClick, moves }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand-wrapper">
        <span className="navbar-brand">15 Puzzle</span>
      </div>
      <div>
        <button
          className="btn btn-outline-light mx-1"
          onClick={() => {
            onNewGameClick();
          }}
          title="New Game"
        >
          <i className="material-icons">power_settings_new</i>{" "}
          <span className="d-none d-sm-inline">New Game</span>
        </button>
        <button
          className="btn btn-outline-light mx-1"
          onClick={() => {
            onResetClick();
          }}
          title="Reset Game"
        >
          <i className="material-icons">clear</i>{" "}
          <span className="d-none d-sm-inline">Reset Game</span>
        </button>
      </div>
      <div className="mr-auto"></div>
      <span className="navbar-text">Moves: {moves}</span>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  moves: state.present.moves,
});

const mapActionsToProps = (dispatch) => ({
  onNewGameClick: bindActionCreators(doNewGame, dispatch),
  onResetClick: bindActionCreators(doReset, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
