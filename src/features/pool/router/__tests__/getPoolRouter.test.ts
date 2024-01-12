import request from "supertest";
import app from "../../../../server/app";
import { type PoolStructure } from "../../types";
import poolsMock from "../../mooks/poolsMock";

describe("Given a GET /pool endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 code and with 2 pool on the body 'beach pool' and 'infinity pool'", async () => {
      const path = "/pools";
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { pools: PoolStructure[] };

      responseBody.pools.forEach((pool, poolPosition) => {
        expect(pool).toHaveProperty("title", poolsMock[poolPosition].title);
      });
    });
  });
});
