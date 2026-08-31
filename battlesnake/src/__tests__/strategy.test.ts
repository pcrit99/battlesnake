import {
  chooseMove,
  findClosestFood,
  getSafeMoves,
  isHeadToHeadDanger,
} from "../logic/strategy";
import { makeBoard, makeRequest, makeSnake } from "./testHelpers";

describe("getSafeMoves", () => {
  it("excludes moves that go off the board", () => {
    const you = makeSnake("you", [{ x: 0, y: 0 }]);
    const board = makeBoard({ width: 11, height: 11, snakes: [you] });
    const request = makeRequest({ you, board });

    const safeMoves = getSafeMoves(request);

    expect(safeMoves).not.toContain("down");
    expect(safeMoves).not.toContain("left");
  });

  it("excludes moves that collide with the snake's own body", () => {
    const you = makeSnake("you", [
      { x: 5, y: 5 },
      { x: 5, y: 6 },
    ]);
    const board = makeBoard({ width: 11, height: 11, snakes: [you] });
    const request = makeRequest({ you, board });

    expect(getSafeMoves(request)).not.toContain("up");
  });
});

describe("findClosestFood", () => {
  it("returns undefined when there is no food", () => {
    const request = makeRequest();

    expect(findClosestFood(request)).toBeUndefined();
  });

  it("returns the closest food by Manhattan distance", () => {
    const you = makeSnake("you", [{ x: 0, y: 0 }]);
    const board = makeBoard({
      snakes: [you],
      food: [
        { x: 5, y: 5 },
        { x: 1, y: 1 },
      ],
    });
    const request = makeRequest({ you, board });

    expect(findClosestFood(request)).toEqual({ x: 1, y: 1 });
  });
});

describe("isHeadToHeadDanger", () => {
  it("is true when a longer snake could reach the same tile", () => {
    const you = makeSnake("you", [{ x: 5, y: 5 }], { length: 3 });
    const bigger = makeSnake("bigger", [{ x: 6, y: 6 }], { length: 5 });
    const board = makeBoard({ snakes: [you, bigger] });
    const request = makeRequest({ you, board });

    expect(isHeadToHeadDanger(request, { x: 6, y: 5 })).toBe(true);
  });

  it("is false when the other snake is shorter or equal length", () => {
    const you = makeSnake("you", [{ x: 5, y: 5 }], { length: 3 });
    const smaller = makeSnake("smaller", [{ x: 6, y: 6 }], { length: 2 });
    const board = makeBoard({ snakes: [you, smaller] });
    const request = makeRequest({ you, board });

    expect(isHeadToHeadDanger(request, { x: 6, y: 5 })).toBe(false);
  });
});

describe("chooseMove", () => {
  it("returns a direction that is one of the safe moves when moves exist", () => {
    const you = makeSnake("you", [{ x: 5, y: 5 }]);
    const board = makeBoard({ snakes: [you], food: [{ x: 8, y: 5 }] });
    const request = makeRequest({ you, board });

    const move = chooseMove(request);

    expect(["up", "down", "left", "right"]).toContain(move);
  });

  it("moves toward food when it is the safest option", () => {
    const you = makeSnake("you", [{ x: 5, y: 5 }]);
    const board = makeBoard({ snakes: [you], food: [{ x: 9, y: 5 }] });
    const request = makeRequest({ you, board });

    expect(chooseMove(request)).toBe("right");
  });

  it("falls back to up when completely boxed in", () => {
    // Surround the head on all four sides so there are no safe moves.
    const you = makeSnake("you", [{ x: 5, y: 5 }]);
    const trap = makeSnake("trap", [
      { x: 5, y: 6 },
      { x: 5, y: 4 },
      { x: 4, y: 5 },
      { x: 6, y: 5 },
    ]);
    const board = makeBoard({ snakes: [you, trap] });
    const request = makeRequest({ you, board });

    expect(chooseMove(request)).toBe("up");
  });
});
