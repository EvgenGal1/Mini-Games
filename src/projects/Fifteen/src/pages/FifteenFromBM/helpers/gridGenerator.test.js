import generateGridState, { generateGrid } from "./gridGenerator";

it("generateGrid random generated", () => {
  let grid = generateGrid(4, 4);

  expect(generateGrid(4, 4)).not.toEqual(grid);
  expect(generateGrid(4, 4)).not.toEqual(grid);
});

it("generateGrid contains all digits with empty one", () => {
  let expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  let grid = generateGrid(4, 4);

  let flatGrid = grid
    .map((item) => item.value)
    .reduce((sum, cols) => sum.concat(cols), []);

  expect(grid.length).toBe(16);

  expect(flatGrid).toEqual(expect.arrayContaining(expected));
});

it("generateGrid creates right object", () => {
  let state = generateGridState(4, 4);

  expect(state.grid.length).not.toBe(undefined);
  expect(state.grid.length).toBe(16);

  let emptyCoordExpected = state.grid.find((item) => !item.value).coord;

  expect(state.emptyCoord).toEqual(emptyCoordExpected);
});
