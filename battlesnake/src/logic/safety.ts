import { Board, Coordinate, Snake } from "../types";

/**
 * Checks whether a coordinate lies within the boundaries of the board.
 * Prevents collisions with walls (requirement #1).
 */
export function isInsideBoard(
  position: Coordinate,
  board: Board,
): boolean {
  return (
    position.x >= 0 &&
    position.x < board.width &&
    position.y >= 0 &&
    position.y < board.height
  );
}

/**
 * Checks whether a coordinate is currently occupied by any snake's body,
 * including our own. Prevents self-collisions and collisions with other
 * snakes (requirements #2 and #3).
 */
export function isOccupied(
  position: Coordinate,
  snakes: Snake[],
): boolean {
  return snakes.some((snake) =>
    snake.body.some(
      (segment) =>
        segment.x === position.x &&
        segment.y === position.y,
    ),
  );
}

/**
 * Combines the wall-boundary and occupancy checks to determine whether a
 * position is safe to move into on the next turn.
 */
export function isSafePosition(
  position: Coordinate,
  board: Board,
  snakes: Snake[],
): boolean {
  if (!isInsideBoard(position, board)) {
    return false;
  }

  if (isOccupied(position, snakes)) {
    return false;
  }

  return true;
}
