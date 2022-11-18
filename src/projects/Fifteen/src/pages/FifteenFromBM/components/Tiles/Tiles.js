import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { doMove } from "./../../store/actions";

import Tile from "./../Tile/Tile";
import Winner from "./../Winner/Winner";

import "./Tiles.css";

const Tiles = ({ tiles, onTileClick }) => {
  return (
    <div className="tiles-wrapper rounded">
      <div className="tiles">
        {tiles.map((item, index) => {
          return (
            <Tile
              key={"item:" + index}
              {...item}
              onClick={() => item.value && onTileClick(item.coord)}
            />
          );
        })}
      </div>
      <Winner />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tiles: state.present.grid,
});

const mapActionsToProps = (dispatch) => ({
  onTileClick: bindActionCreators(doMove, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Tiles);
