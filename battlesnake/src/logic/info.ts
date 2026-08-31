import { BattlesnakeInfoResponse } from "../types";

/**
 * Returns the Battlesnake's customisation and metadata, shown by the
 * Battlesnake game engine and web UI. Satisfies the requirement for a
 * customised appearance (colour, head style, tail style).
 */
export function getInfo(): BattlesnakeInfoResponse {
  return {
    apiversion: "1",
    author: "your-github-username",
    color: "#2E86AB",
    head: "default",
    tail: "default",
    version: "1.0.0",
  };
}
