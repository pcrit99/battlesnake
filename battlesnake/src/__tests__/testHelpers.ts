import { BattlesnakeRequest, Board, Coordinate, Snake } from "../types";

export function makeSnake(
  id: string,
  body: Coordinate[],
  overrides: Partial<Snake> = {},
): Snake {
  return {
    id,
    name: id,
    health: 100,
    body,
    head: body[0],
    length: body.length,
    ...overrides,
  };
}

export function makeBoard(overrides: Partial<Board> = {}): Board {
  return {
    height: 11,
    width: 11,
    food: [],
    snakes: [],
    ...overrides,
  };
}

export function makeRequest(
  overrides: Partial<BattlesnakeRequest> = {},
): BattlesnakeRequest {
  const you = makeSnake("you", [{ x: 5, y: 5 }]);
  const board = makeBoard({ snakes: [you] });

  return {
    game: {
      id: "test-game",
      ruleset: { name: "standard" },
    },
    turn: 1,
    board,
    you,
    ...overrides,
  };
}
