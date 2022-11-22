export const coordsCompare = (one, two) => {
  return one[0] === two[0] && one[1] === two[1];
};

// ^ возврат - rMax,cMax сменить с 2 на 4
export const isCoordPossibleToMove = (coord, rMax = 2, cMax = 2) => {
  return coord[0] >= 0 && coord[0] < rMax && coord[1] >= 0 && coord[1] < cMax;
};

export const getPossibleCoordsToMove = (fromCoord) => {
  let row = fromCoord[0];
  let col = fromCoord[1];

  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ].filter((coords) => isCoordPossibleToMove(coords));
};

export const isEmptyCoordPossibleToMove = (fromCoord, emptyCoord) => {
  let res = getPossibleCoordsToMove(fromCoord).filter((coord) =>
    coordsCompare(coord, emptyCoord)
  );

  return res && res[0] ? true : false;
};

// ^ возврат - rMax,cMax сменить с 2 на 4
export const isRightCoordPosition = (coord, value, rMax = 2, cMax = 2) => {
  if (!value) {
    return coord[0] === rMax - 1 && coord[1] === cMax - 1;
  }

  return value === coord[0] * cMax + coord[1] + 1;
};

export const findIndexByCoord = (grid, coord) => {
  return grid.findIndex((item) => coordsCompare(item.coord, coord));
};
