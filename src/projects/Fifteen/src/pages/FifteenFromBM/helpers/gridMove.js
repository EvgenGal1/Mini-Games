import { findIndexByCoord } from "./gridFinder";

export const getMovedGrid = (grid, fromCoord, toCoord) => {
  let gridNew = grid.slice(0).map((item) => Object.assign({}, item));

  let fromPosition = findIndexByCoord(gridNew, fromCoord);
  let toPosition = findIndexByCoord(gridNew, toCoord);

  if (fromPosition === -1 || toPosition === -1) {
    return;
  }

  // swap coords
  let tmp = gridNew[fromPosition].coord.slice(0);
  gridNew[fromPosition].coord = gridNew[toPosition].coord.slice(0);
  gridNew[toPosition].coord = tmp;

  return gridNew;
};
