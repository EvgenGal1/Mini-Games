import React from "react";
import { connect } from "react-redux";

import "./Winner.css";

const Winner = ({ win }) => {
  if (!win) {
    return null;
  }

  return (
    <div className="winner-alert">
      <span>WIN!</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  win: state.present.win,
});

export default connect(mapStateToProps)(Winner);
