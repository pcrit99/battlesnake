## \# Battlesnake — CCS2430 Individual Assessment

## 

## An individual Battlesnake implementation built with TypeScript and Express, developed for the CCS2430 Software Development in Practice resit assessment.

## 

## \## Installation

## 

## Requirements: Node.js 20+ and npm.

## 

## git clone https://github.com/pcrit99/battlesnake

## cd battlesnake

## npm install

## 

## \## Running the application

## 

## Start the server locally in development mode: npm run dev

## 

## The server listens on port 8000 by default. To expose it publicly for testing against the Battlesnake game engine, use a tunnelling tool such as ngrok: ngrok http 8000

## 

## Register the resulting URL at play.battlesnake.com to run games against it.

## 

## To build and run the compiled output: npm run build then npm start

## 

## \## Running tests, coverage and linting

## 

## npm test               - run the Jest test suite

## npm run test:coverage  - run tests and print a coverage report

## npm run lint           - lint the codebase with ESLint

## npm run format:check   - verify formatting with Prettier

## npm run format          - auto-format the codebase with Prettier

## 

## The project enforces a minimum of 50% overall statement coverage, configured in jest.config.js. Continuous integration runs all of these checks automatically on every pull request.

## 

## \## Decision-making strategy

## 

## On every /move request, chooseMove (in src/logic/strategy.ts) selects a direction using this pipeline:

## 

## 1\. Safety filtering (getSafeMoves) - the four candidate directions are filtered to those that do not immediately collide with a wall, the snake's own body, or another snake's body (src/logic/safety.ts).

## 2\. Head-to-head avoidance (isHeadToHeadDanger) - checks whether a strictly longer opposing snake could also reach that tile next turn. Such moves are heavily penalised.

## 3\. Space evaluation (floodFill) - each candidate tile is scored by the number of empty tiles connected to it, via breadth-first flood fill (src/logic/floodFill.ts). This discourages moving into small pockets or dead ends.

## 4\. Food seeking (findClosestFood) - the nearest food is located using Manhattan distance (src/utils/distance.ts), and moves that reduce distance to it are rewarded.

## 

## The final score for each safe direction is: score = (availableSpace \* 10) - (distanceToFood \* 5), with a large negative score for unsafe or head-to-head-losing moves. The highest-scoring direction is chosen. If no direction is safe, the snake defaults to "up".

## 

## Space evaluation is weighted more heavily than food distance, so the snake generally prioritises staying alive over grabbing nearby food.

## 

## \## Repository structure

## 

## src/types.ts - shared TypeScript types matching the Battlesnake API

## src/server.ts - Express server exposing /, /start, /move, /end

## src/logic/info.ts - snake customisation (colour, head, tail)

## src/logic/move.ts - computes the next coordinate for a direction

## src/logic/safety.ts - wall / self / other-snake collision checks

## src/logic/floodFill.ts - space-evaluation (flood fill) algorithm

## src/logic/strategy.ts - combines the above into chooseMove()

## src/utils/distance.ts - Manhattan distance helper

## src/\_\_tests\_\_/ - Jest unit and integration tests

## .github/workflows/ci.yml - continuous integration pipeline

## 

## \## Known limitations

## 

## \- The safety check does not account for the fact that a snake's tail segment usually vacates its tile the following turn, making the snake slightly more cautious than necessary around tails.

## \- The strategy evaluates each candidate move independently and does not simulate opponents' future moves beyond the immediate head-to-head check.

## \- Flood fill treats all reachable space as equally valuable, without distinguishing space near a dangerous longer opponent.

## \- The snake does not target specific opponents to eliminate ("hunting"), and has not been tuned for hazard/royale modes, per the reduced scope of this resit assessment.

## 

## \## Author

## 

## pcrit99

