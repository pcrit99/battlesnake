import { Board, Coordinate, Direction } from "../types";

import { getNextPosition } from "./move";
import { isInsideBoard, isOccupied } from "./safety";

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

function coordinateKey(position: Coordinate): string {
  return `${position.x},${position.y}`;
}

/**
 * Performs a breadth-first flood fill starting from `start` to count how
 * many empty, reachable board tiles are connected to it. Used as a
 * space-evaluation heuristic (requirement #6): moving into a position with
 * a small connected area is a strong signal that the snake risks trapping
 * itself.
 *
 * @param start - The coordinate to begin the flood fill from.
 * @param board - The current board state.
 * @returns The number of reachable, unoccupied tiles connected to `start`.
 */
export function floodFill(
  start: Coordinate,
  board: Board,
): number {
  const queue: Coordinate[] = [start];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) {
      continue;
    }

    const currentKey = coordinateKey(current);

    if (visited.has(currentKey)) {
      continue;
    }

    if (!isInsideBoard(current, board)) {
      continue;
    }

    if (isOccupied(current, board.snakes)) {
      continue;
    }

    visited.add(currentKey);

    for (const direction of DIRECTIONS) {
      const nextPosition = getNextPosition(current, direction);
      const nextKey = coordinateKey(nextPosition);

      if (
        !visited.has(nextKey) &&
        isInsideBoard(nextPosition, board) &&
        !isOccupied(nextPosition, board.snakes)
      ) {
        queue.push(nextPosition);
      }
    }
  }

  return visited.size;
}
