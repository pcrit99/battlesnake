import request from "supertest";

import app from "../server";
import { makeRequest } from "./testHelpers";

describe("GET /", () => {
  it("returns customisation info", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body.apiversion).toBe("1");
    expect(res.body.color).toBeDefined();
  });
});

describe("POST /start", () => {
  it("returns 200 ok", async () => {
    const res = await request(app).post("/start").send(makeRequest());

    expect(res.status).toBe(200);
  });
});

describe("POST /move", () => {
  it("returns a valid move for a given game state", async () => {
    const res = await request(app).post("/move").send(makeRequest());

    expect(res.status).toBe(200);
    expect(["up", "down", "left", "right"]).toContain(res.body.move);
  });
});

describe("POST /end", () => {
  it("returns 200 ok", async () => {
    const res = await request(app).post("/end").send(makeRequest());

    expect(res.status).toBe(200);
  });
});
