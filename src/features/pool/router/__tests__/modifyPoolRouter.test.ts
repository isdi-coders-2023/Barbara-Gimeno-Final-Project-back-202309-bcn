import request from "supertest";
import app from "../../../../server/app";
import Pool from "../../model/Pool";
import { type PoolStructure, type PoolDataStructure } from "../../types";
import modifyPoolMock from "../../mooks/modifyPoolMock";

describe("Given a PATCH /pools/6572edf668fea6caed13b908 endpoint", () => {
  describe("When it receives a request with a valid id '6572edf668fea6caed13b908'", () => {
    test("Then it should respond with status 200 and the title of 'beach pool'", async () => {
      const path = "/pools/6572edf668fea6caed13b908";
      const expectedStatusCode = 200;
      const expectedTitle = "beach pool";

      await Pool.create(modifyPoolMock);

      const response = await request(app)
        .patch(path)
        .send(modifyPoolMock)
        .expect(expectedStatusCode);

      const responseBody = response.body as { pool: PoolStructure };

      expect(responseBody.pool).toHaveProperty("title", expectedTitle);
    });
  });

  describe("When it receives a rewuest with an invalid id", () => {
    test("Then it shpuld respond with a status code 400 and a message 'Couldn't modify the pool", async () => {
      const path = "/pools/wrong-id";
      const expectedStatus = 400;
      const expectedError = { error: "Couldn't modify the pool" };

      const response = await request(app).patch(path).expect(expectedStatus);

      const responseBody = response.body as { error: PoolDataStructure };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
