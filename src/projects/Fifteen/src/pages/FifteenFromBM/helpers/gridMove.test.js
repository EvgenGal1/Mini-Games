import { getMovedGrid } from "./gridMove";

it("getMovedGrid return object with only coord changed and not mutate object", () => {
  let grid = [
    { coord: [0, 0], value: 0 },
    { coord: [0, 1], value: 2 },
    { coord: [0, 2], value: 3 },
    { coord: [1, 0], value: 4 },
    { coord: [1, 1], value: 5 },
    { coord: [1, 2], value: 6 },
    { coord: [2, 0], value: 7 },
    { coord: [2, 1], value: 8 },
    { coord: [2, 2], value: 9 },
  ];

  let gridCloned = JSON.parse(JSON.stringify(grid));

  // swap [0, 1] and [0, 0]
  let gridMoved1 = [
    { coord: [0, 1], value: 0 },
    { coord: [0, 0], value: 2 },
    { coord: [0, 2], value: 3 },
    { coord: [1, 0], value: 4 },
    { coord: [1, 1], value: 5 },
    { coord: [1, 2], value: 6 },
    { coord: [2, 0], value: 7 },
    { coord: [2, 1], value: 8 },
    { coord: [2, 2], value: 9 },
  ];

  // swap [1, 1] and [0, 0]
  let gridMoved2 = [
    { coord: [0, 1], value: 0 },
    { coord: [1, 1], value: 2 },
    { coord: [0, 2], value: 3 },
    { coord: [1, 0], value: 4 },
    { coord: [0, 0], value: 5 },
    { coord: [1, 2], value: 6 },
    { coord: [2, 0], value: 7 },
    { coord: [2, 1], value: 8 },
    { coord: [2, 2], value: 9 },
  ];

  expect(getMovedGrid(grid, [0, 1], [0, 0])).toEqual(gridMoved1);
  expect(getMovedGrid(gridMoved1, [1, 1], [0, 0])).toEqual(gridMoved2);

  expect(getMovedGrid(gridMoved1, [0, 0], [10, 10])).toBe(undefined);

  expect(grid).toEqual(gridCloned);
});
