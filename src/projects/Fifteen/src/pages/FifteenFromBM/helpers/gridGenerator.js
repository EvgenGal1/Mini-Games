import { isRightCoordPosition } from "./gridFinder";

// ^ возврат - rMax,cMax сменить с 2 на 4
export const generateGrid = (rMax = 2, cMax = 2) => {
  let size = rMax * cMax;
  let plain = new Array(size).fill(0).map((_, i) => i);

  let grid = [];

  for (let r = 0; r < rMax; r++) {
    for (let c = 0; c < cMax; c++) {
      let item = {
        coord: [r, c],
        value: plain.splice(getRandomInt(0, plain.length), 1)[0],
      };

      item.done = isRightCoordPosition(item.coord, item.value);

      grid.push(item);
    }
  }

  return grid;
};

// ^ возврат - rMax,cMax сменить с 2 на 4
export default (rMax = 2, cMax = 2) => {
  let state = {};

  state.grid = generateGrid(rMax, cMax);
  state.win =
    state.grid.filter((item) => item.done).length === state.grid.length;
  state.emptyCoord = state.grid.find((item) => !item.value).coord;

  return state;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
