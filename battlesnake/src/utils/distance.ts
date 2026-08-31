import { Coordinate } from "../types";

/**
 * Calculates the Manhattan distance between two coordinates on the board.
 * Manhattan distance is the sum of the absolute differences of the x and y
 * coordinates, and represents the minimum number of orthogonal moves needed
 * to travel from one point to the other (no diagonal movement is allowed
 * in Battlesnake).
 *
 * @param a - The first coordinate.
 * @param b - The second coordinate.
 * @returns The Manhattan distance between `a` and `b`.
 */
export function manhattanDistance(
  a: Coordinate,
  b: Coordinate,
): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
