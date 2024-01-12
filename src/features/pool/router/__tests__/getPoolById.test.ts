import app from "../../../../server/app";
import "../../../../server/index";
import request from "supertest";
import poolsIdMock from "../../mooks/poolsIdMock";
import { type PoolStructure } from "../../types";
import Pool from "../../model/Pool";

describe("Given a GET method '/Pools/:id' endpoint", () => {
  describe("When it receives a Request with a valid id in the body", () => {
    const expectedStatus = 200;
    const poolIdMock = poolsIdMock._id;

    const path = `/pools/${poolIdMock}`;

    describe("When it receives a Request with an incorrect id in the body", () => {
      test("Then the response should have a 400 status code and the message 'Couldn't find the pool' on it's body", async () => {
        await Pool.create(poolsIdMock);
        const expectedMessage = "Couldn't find the pool";

        const response = await request(app).get(path).expect(expectedStatus);

        const responseBody = response.body as {
          idPool: PoolStructure;
        };

        expect(responseBody.idPool).toHaveProperty("title", "beach pool");
      });
    });

    describe("When it receives a invalid id pool in the body's request", () => {
      test("Then it should call the response's method 400 and the message 'Error finding a pool'", async () => {
        const expectedStatus = 400;
        const expectedMessage = "Error finding a pool";
        const wrongPath = `/pools/poolWrong`;

        const response = await request(app)
          .get(wrongPath)
          .expect(expectedStatus);
        expect(response.body).toHaveProperty("error", expectedMessage);
      });
    });
  });
});
