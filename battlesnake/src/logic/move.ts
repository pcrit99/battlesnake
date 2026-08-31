import { Coordinate, Direction } from "../types";

/**
 * Calculates the coordinate that results from moving one step in the
 * given direction from the given position.
 *
 * @param position - The starting coordinate.
 * @param direction - The direction to move in.
 * @returns The resulting coordinate.
 */
export function getNextPosition(
  position: Coordinate,
  direction: Direction,
): Coordinate {
  switch (direction) {
    case "up":
      return {
        x: position.x,
        y: position.y + 1,
      };

    case "down":
      return {
        x: position.x,
        y: position.y - 1,
      };

    case "left":
      return {
        x: position.x - 1,
        y: position.y,
      };

    case "right":
      return {
        x: position.x + 1,
        y: position.y,
      };
  }
}
