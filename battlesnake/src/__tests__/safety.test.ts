import { isInsideBoard, isOccupied, isSafePosition } from "../logic/safety";
import { makeBoard, makeSnake } from "./testHelpers";

describe("isInsideBoard", () => {
  const board = makeBoard({ width: 11, height: 11 });

  it("returns true for a position inside the board", () => {
    expect(isInsideBoard({ x: 5, y: 5 }, board)).toBe(true);
  });

  it.each([
    [{ x: -1, y: 5 }],
    [{ x: 11, y: 5 }],
    [{ x: 5, y: -1 }],
    [{ x: 5, y: 11 }],
  ])("returns false for out-of-bounds position %o", (position) => {
    expect(isInsideBoard(position, board)).toBe(false);
  });
});

describe("isOccupied", () => {
  const snakes = [
    makeSnake("a", [
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ]),
  ];

  it("returns true when the position overlaps a snake segment", () => {
    expect(isOccupied({ x: 2, y: 3 }, snakes)).toBe(true);
  });

  it("returns false when the position is empty", () => {
    expect(isOccupied({ x: 9, y: 9 }, snakes)).toBe(false);
  });
});

describe("isSafePosition", () => {
  const board = makeBoard({ width: 11, height: 11 });
  const snakes = [makeSnake("a", [{ x: 2, y: 2 }])];

  it("returns false when out of bounds", () => {
    expect(isSafePosition({ x: -1, y: 0 }, board, snakes)).toBe(false);
  });

  it("returns false when occupied", () => {
    expect(isSafePosition({ x: 2, y: 2 }, board, snakes)).toBe(false);
  });

  it("returns true for an empty, in-bounds tile", () => {
    expect(isSafePosition({ x: 5, y: 5 }, board, snakes)).toBe(true);
  });
});
