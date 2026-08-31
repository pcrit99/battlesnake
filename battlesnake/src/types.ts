export interface Coordinate {
  x: number;
  y: number;
}

export interface Snake {
  id: string;
  name: string;
  health: number;
  length: number;
  body: Coordinate[];
  head: Coordinate;
}

export interface Board {
  height: number;
  width: number;
  food: Coordinate[];
  snakes: Snake[];
}

export interface Game {
  id: string;
  ruleset: {
    name: string;
  };
}

export interface BattlesnakeRequest {
  game: Game;
  turn: number;
  board: Board;
  you: Snake;
}

export type Direction = "up" | "down" | "left" | "right";

export interface BattlesnakeInfoResponse {
  apiversion: string;
  author?: string;
  color?: string;
  head?: string;
  tail?: string;
  version?: string;
}

export interface MoveResponse {
  move: Direction;
  shout?: string;
}
