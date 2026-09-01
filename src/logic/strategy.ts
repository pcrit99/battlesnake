import { BattlesnakeRequest, Coordinate, Direction } from "../types";

import { getNextPosition } from "./move";
import { isSafePosition } from "./safety";
import { manhattanDistance } from "../utils/distance";
import { floodFill } from "./floodFill";

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

/**
 * Returns the subset of the four cardinal directions that do not result in
 * an immediate collision with a wall, our own body, or another snake.
 */
export function getSafeMoves(request: BattlesnakeRequest): Direction[] {
  const { board, you } = request;

  return DIRECTIONS.filter((direction) => {
    const nextPosition = getNextPosition(you.head, direction);

    return isSafePosition(nextPosition, board, board.snakes);
  });
}

/**
 * Finds the closest piece of food to our snake's head, measured using
 * Manhattan distance (requirement #5).
 */
export function findClosestFood(
  request: BattlesnakeRequest,
): Coordinate | undefined {
  const { board, you } = request;

  if (board.food.length === 0) {
    return undefined;
  }

  let closestFood = board.food[0];
  let closestDistance = manhattanDistance(you.head, closestFood);

  for (const food of board.food) {
    const distance = manhattanDistance(you.head, food);

    if (distance < closestDistance) {
      closestFood = food;
      closestDistance = distance;
    }
  }

  return closestFood;
}

/**
 * Determines whether moving into `position` risks a head-to-head collision
 * with a strictly longer opposing snake (requirement #4). A longer snake
 * that could also reach this tile next turn would win a head-to-head
 * collision, so such moves are treated as dangerous.
 */
export function isHeadToHeadDanger(
  request: BattlesnakeRequest,
  position: Coordinate,
): boolean {
  const { board, you } = request;

  for (const snake of board.snakes) {
    if (snake.id === you.id) {
      continue;
    }

    if (snake.length <= you.length) {
      continue;
    }

    const distance = manhattanDistance(snake.head, position);

    if (distance <= 1) {
      return true;
    }
  }

  return false;
}

/**
 * Scores a candidate direction by combining three signals: safety
 * (unsafe or head-to-head-losing moves are heavily penalised), available
 * connected space via flood fill (to avoid self-trapping), and proximity
 * to the nearest food.
 */
function scoreMove(
  request: BattlesnakeRequest,
  direction: Direction,
  food: Coordinate | undefined,
): number {
  const { board, you } = request;

  const nextPosition = getNextPosition(you.head, direction);

  if (!isSafePosition(nextPosition, board, board.snakes)) {
    return -Infinity;
  }

  if (isHeadToHeadDanger(request, nextPosition)) {
    return -10000;
  }

  const availableSpace = floodFill(nextPosition, board);

  let score = availableSpace * 10;

  if (food) {
    const distanceToFood = manhattanDistance(nextPosition, food);

    score -= distanceToFood * 5;
  }

  return score;
}

/**
 * Chooses the best direction to move in on this turn by scoring every
 * safe candidate move and selecting the highest-scoring option. Falls
 * back to "up" only when no move is safe (an unavoidable loss).
 */
export function chooseMove(request: BattlesnakeRequest): Direction {
  const safeMoves = getSafeMoves(request);

  if (safeMoves.length === 0) {
    return "up";
  }

  const food = findClosestFood(request);

  let bestMove = safeMoves[0];
  let bestScore = -Infinity;

  for (const move of safeMoves) {
    const score = scoreMove(request, move, food);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
