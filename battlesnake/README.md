# Battlesnake — CCS2430 Individual Assessment

An individual Battlesnake implementation built with TypeScript and Express,
developed for the CCS2430 Software Development in Practice resit
assessment.

## Table of contents

- [Installation](#installation)
- [Running the application](#running-the-application)
- [Running tests, coverage and linting](#running-tests-coverage-and-linting)
- [Decision-making strategy](#decision-making-strategy)
- [Repository structure](#repository-structure)
- [Known limitations](#known-limitations)

## Installation

Requirements: Node.js 20+ and npm.

```bash
git clone <this-repository-url>
cd battlesnake
npm install
```

## Running the application

Start the server locally in development mode:

```bash
npm run dev
```

The server listens on port `8000` by default (override with the `PORT`
environment variable). To expose it publicly for testing against the
Battlesnake game engine, use a tunnelling tool such as [ngrok](https://ngrok.com):

```bash
ngrok http 8000
```

Register the resulting URL at [play.battlesnake.com](https://play.battlesnake.com)
to run games against it, or use the
[Battlesnake CLI](https://github.com/BattlesnakeOfficial/rules/tree/main/cli)
to run a local game:

```bash
battlesnake play -W 11 -H 11 --name mysnake --url http://localhost:8000 -g solo
```

To build the compiled JavaScript output and run it directly:

```bash
npm run build
npm start
```

## Running tests, coverage and linting

```bash
npm test               # run the Jest test suite
npm run test:coverage  # run tests and print a coverage report
npm run lint           # lint the codebase with ESLint
npm run format:check   # verify formatting with Prettier
npm run format         # auto-format the codebase with Prettier
```

The project enforces a minimum of 50% overall statement coverage
(configured in `jest.config.js`). Continuous integration (see below) runs
all of these checks automatically on every pull request.

## Decision-making strategy

On every `/move` request, `chooseMove` (in `src/logic/strategy.ts`) selects
a direction using the following pipeline:

1. **Safety filtering (`getSafeMoves`)** — the four candidate directions
   are filtered down to those that do not immediately collide with a
   wall, the snake's own body, or another snake's body
   (`src/logic/safety.ts`).
2. **Head-to-head avoidance (`isHeadToHeadDanger`)** — for each remaining
   candidate, the strategy checks whether a strictly longer opposing
   snake could also reach that tile next turn. Such moves are heavily
   penalised, since a head-to-head collision against a longer snake is
   always lost.
3. **Space evaluation (`floodFill`)** — each candidate tile is scored by
   the number of empty tiles connected to it, found via a breadth-first
   flood fill (`src/logic/floodFill.ts`). This discourages the snake from
   moving into small pockets or dead ends where it could trap itself,
   even if that move looks locally safe.
4. **Food seeking (`findClosestFood`)** — the nearest food is located
   using Manhattan distance (`src/utils/distance.ts`), and candidate
   moves that reduce the distance to that food are rewarded.

The final score for each safe direction is:

```
score = (availableSpace * 10) - (distanceToFood * 5)
```

with a large negative score for unsafe or head-to-head-losing moves. The
direction with the highest score is chosen. If no direction is safe, the
snake defaults to `"up"` (an unavoidable loss is being taken).

Space evaluation is weighted more heavily than food distance, so the
snake generally prioritises staying alive over grabbing nearby food.

## Repository structure

```
src/
  types.ts              Shared TypeScript types matching the Battlesnake API
  server.ts              Express server exposing /, /start, /move, /end
  logic/
    info.ts              Snake customisation (colour, head, tail)
    move.ts               Computes the next coordinate for a direction
    safety.ts             Wall / self / other-snake collision checks
    floodFill.ts           Space-evaluation (flood fill) algorithm
    strategy.ts            Combines the above into chooseMove()
  utils/
    distance.ts            Manhattan distance helper
  __tests__/                Jest unit and integration tests
.github/workflows/ci.yml     Continuous integration pipeline
```

## Known limitations

- The safety check does not account for the fact that a snake's tail
  segment usually vacates its tile on the following turn (unless the
  snake has just eaten). This makes the snake slightly more cautious
  than strictly necessary around tails.
- The strategy evaluates each candidate move independently and does not
  simulate opponents' likely future moves beyond the immediate
  head-to-head check, so it can be out-manoeuvred by more sophisticated
  multi-turn opponents.
- Flood fill treats all reachable space as equally valuable and does not
  distinguish space that is only reachable by passing close to a
  dangerous, longer opponent.
- The snake does not target specific opponents to eliminate ("hunting"),
  and has not been tuned for hazard/royale game modes, per the reduced
  scope of this resit assessment.

## Author

Kriton Panigyris CSY24113.
