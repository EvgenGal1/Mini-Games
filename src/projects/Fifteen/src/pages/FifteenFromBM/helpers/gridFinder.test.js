import {
  coordsCompare,
  isCoordPossibleToMove,
  getPossibleCoordsToMove,
  isEmptyCoordPossibleToMove,
  isRightCoordPosition,
  findIndexByCoord,
} from "./gridFinder";

it("coordsCompare compare coords correctly", () => {
  expect(coordsCompare([1, 2], [1, 2])).toBe(true);
  expect(coordsCompare([0, 0], [0, 0])).toBe(true);

  expect(coordsCompare([1, 1], [2, 2])).toBe(false);
  expect(coordsCompare([1, 2], [2, 1])).toBe(false);
});

it("isCoordPossibleToMove worked correctly", () => {
  expect(isCoordPossibleToMove([0, 0], 4, 4)).toBe(true);
  expect(isCoordPossibleToMove([3, 3], 4, 4)).toBe(true);

  expect(isCoordPossibleToMove([3, 4], 4, 4)).toBe(false);
  expect(isCoordPossibleToMove([4, 3], 4, 4)).toBe(false);
  expect(isCoordPossibleToMove([-1, -1], 4, 4)).toBe(false);
  expect(isCoordPossibleToMove([-1, 0], 4, 4)).toBe(false);
  expect(isCoordPossibleToMove([0, -1], 4, 4)).toBe(false);
});

it("getPossibleCoordsToMove returns only possible coords to move to", () => {
  expect(getPossibleCoordsToMove([0, 0])).toEqual([
    [1, 0],
    [0, 1],
  ]);
  expect(getPossibleCoordsToMove([1, 1])).toEqual([
    [0, 1],
    [2, 1],
    [1, 0],
    [1, 2],
  ]);
  expect(getPossibleCoordsToMove([3, 0])).toEqual([
    [2, 0],
    [3, 1],
  ]);

  expect(getPossibleCoordsToMove([0, 0])).not.toEqual([
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]);
});

it("isEmptyCoordPossibleToMove returns true if emptyCoord is possible to move to", () => {
  expect(isEmptyCoordPossibleToMove([0, 0], [1, 0])).toBe(true);
  expect(isEmptyCoordPossibleToMove([0, 0], [0, 1])).toBe(true);
  expect(isEmptyCoordPossibleToMove([0, 0], [1, 1])).toBe(false);

  expect(isEmptyCoordPossibleToMove([1, 1], [0, 1])).toBe(true);
  expect(isEmptyCoordPossibleToMove([1, 1], [1, 0])).toBe(true);
  expect(isEmptyCoordPossibleToMove([1, 1], [2, 1])).toBe(true);
  expect(isEmptyCoordPossibleToMove([1, 1], [1, 2])).toBe(true);
  expect(isEmptyCoordPossibleToMove([1, 1], [0, 0])).toBe(false);
  expect(isEmptyCoordPossibleToMove([1, 1], [0, 2])).toBe(false);
  expect(isEmptyCoordPossibleToMove([1, 1], [2, 0])).toBe(false);
  expect(isEmptyCoordPossibleToMove([1, 1], [2, 2])).toBe(false);
});

it("isRightCoordPosition return true if tile on needed place, else return false", () => {
  let rMax = 2;
  let cMax = 2;

  let grid = [
    { coord: [0, 0], value: 1 },
    { coord: [0, 1], value: 2 },
    { coord: [1, 0], value: 3 },
    { coord: [1, 1], value: 0 },
  ];

  grid.forEach((item) => {
    expect(isRightCoordPosition(item.coord, item.value, rMax, cMax)).toBe(true);
  });

  expect(isRightCoordPosition([0, 0], 2, rMax, cMax)).toBe(false);
});

it("findIndexByCoord return position by exist coord or null ", () => {
  let grid = [
    { coord: [0, 0], value: 1 },
    { coord: [0, 1], value: 2 },
    { coord: [1, 2], value: 3 },
    { coord: [1, 0], value: 4 },
    { coord: [1, 1], value: 5 },
    { coord: [0, 2], value: 6 },
    { coord: [2, 0], value: 7 },
    { coord: [2, 1], value: 8 },
    { coord: [2, 2], value: 9 },
  ];

  expect(findIndexByCoord(grid, [0, 0])).toBe(0);
  expect(findIndexByCoord(grid, [1, 2])).toBe(2);
  expect(findIndexByCoord(grid, [0, 2])).toBe(5);

  expect(findIndexByCoord(grid, [1, 1])).toBe(4);

  expect(findIndexByCoord(grid, [2, 2])).toBe(8);

  expect(findIndexByCoord(grid, [5, 6])).toBe(-1);
});
