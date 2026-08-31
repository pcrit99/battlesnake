import express, { Request, Response } from "express";

import { getInfo } from "./logic/info";
import { chooseMove } from "./logic/strategy";
import { BattlesnakeRequest } from "./types";

const app = express();
app.use(express.json());

/**
 * GET / — Called once when your Battlesnake is registered with a game.
 * Returns customisation info (colour, head, tail).
 */
app.get("/", (_req: Request, res: Response) => {
  res.json(getInfo());
});

/**
 * POST /start — Called at the beginning of each game.
 */
app.post("/start", (_req: Request, res: Response) => {
  res.status(200).send("ok");
});

/**
 * POST /move — Called on every turn of the game. This is where the
 * decision-making logic runs and a direction is chosen.
 */
app.post("/move", (req: Request, res: Response) => {
  const gameState = req.body as BattlesnakeRequest;
  const move = chooseMove(gameState);

  res.json({ move });
});

/**
 * POST /end — Called when the game finishes.
 */
app.post("/end", (_req: Request, res: Response) => {
  res.status(200).send("ok");
});

const PORT = process.env.PORT || 8000;

/* istanbul ignore next -- starting a real server is not exercised by unit tests */
if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Battlesnake server listening on port ${PORT}`);
  });
}

export default app;
