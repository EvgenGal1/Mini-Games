import undoable, { includeAction } from "redux-undo";

import { ACTION_MOVE, ACTION_NEW_GAME, ACTION_RESET } from "./actions";
import {
  isEmptyCoordPossibleToMove,
  isRightCoordPosition,
} from "./../helpers/gridFinder";
import { getMovedGrid } from "./../helpers/gridMove";
import generateGridState from "./../helpers/gridGenerator";

const baseState = {
  started: false,
  moves: 0,
};

const initialState = {
  ...baseState,
  ...generateGridState(),
};

let startState = {
  ...initialState,
  ...generateGridState(),
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_MOVE:
      let fromCoord = action.payload;
      let toCoord = state.grid.find((item) => !item.value).coord;

      let grid =
        isEmptyCoordPossibleToMove(fromCoord, toCoord) &&
        getMovedGrid(state.grid, fromCoord, toCoord);

      if (!grid) {
        return state;
      }

      grid = grid.map((item) => {
        item.done = isRightCoordPosition(item.coord, item.value);

        return item;
      });

      let gridDone = grid.filter((item) => item.done);

      return {
        ...state,
        started: true,
        win: gridDone.length === grid.length,
        moves: state.moves + 1,
        grid: grid,
      };

    case ACTION_NEW_GAME:
      startState = {
        ...initialState,
        ...generateGridState(),
      };

      return startState;

    case ACTION_RESET:
      return { ...startState };

    default:
      return state;
  }
};

export default undoable(rootReducer, { filter: includeAction([ACTION_MOVE]) });
