import { getNextPosition } from "../logic/move";

describe("getNextPosition", () => {
  const start = { x: 5, y: 5 };

  it("moves up by incrementing y", () => {
    expect(getNextPosition(start, "up")).toEqual({ x: 5, y: 6 });
  });

  it("moves down by decrementing y", () => {
    expect(getNextPosition(start, "down")).toEqual({ x: 5, y: 4 });
  });

  it("moves left by decrementing x", () => {
    expect(getNextPosition(start, "left")).toEqual({ x: 4, y: 5 });
  });

  it("moves right by incrementing x", () => {
    expect(getNextPosition(start, "right")).toEqual({ x: 6, y: 5 });
  });
});
