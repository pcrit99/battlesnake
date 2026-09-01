import { floodFill } from "../logic/floodFill";
import { makeBoard, makeSnake } from "./testHelpers";

describe("floodFill", () => {
  it("counts every tile on an empty board reachable from the start", () => {
    const board = makeBoard({ width: 3, height: 3, snakes: [] });

    // A 3x3 empty board has 9 reachable tiles from any starting point.
    expect(floodFill({ x: 1, y: 1 }, board)).toBe(9);
  });

  it("returns a smaller count when walls enclose a small pocket", () => {
    // Enclose (0,0) in a 3x3 board with a snake body forming an L-wall,
    // leaving only the single starting tile reachable.
    const wall = makeSnake("wall", [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
    const board = makeBoard({ width: 3, height: 3, snakes: [wall] });

    expect(floodFill({ x: 0, y: 0 }, board)).toBe(1);
  });

  it("returns 0 when the starting tile itself is occupied", () => {
    const snake = makeSnake("s", [{ x: 1, y: 1 }]);
    const board = makeBoard({ width: 3, height: 3, snakes: [snake] });

    expect(floodFill({ x: 1, y: 1 }, board)).toBe(0);
  });

  it("returns 0 when the starting tile is outside the board", () => {
    const board = makeBoard({ width: 3, height: 3, snakes: [] });

    expect(floodFill({ x: 10, y: 10 }, board)).toBe(0);
  });

  it("does not count tiles beyond a fully enclosing wall", () => {
    // Surround the centre of a 5x5 board with a ring, so only the
    // centre tile itself is reachable.
    const ring = makeSnake("ring", [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
    ]);
    const board = makeBoard({ width: 5, height: 5, snakes: [ring] });

    expect(floodFill({ x: 2, y: 2 }, board)).toBe(1);
  });
});
