import app from "../../../../server/app";
import "../../../../server/index";
import request from "supertest";
import "../../../../setupTests";
import poolsMock from "../../mooks/poolsMock";

describe("Given a POST method '/create' endpoint", () => {
  describe("When it receives a valid pool in the body's request", () => {
    test("Then it should call the response's method status code with 201 Status Code and the 'Pool has been created succesfully' message", async () => {
      const path = "/pools/create";
      const expectedStatus = 201;
      const expectedMessage = "Pool has been created succesfully";

      const response = await request(app)
        .post(path)
        .send(poolsMock[0])
        .expect(expectedStatus);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });

    test("Then it should call the response method with Status Code 201 and the new pool created in the response's body", async () => {
      const expectedNewPoolCreate = "title";
      const path = "/pools/create";
      const expectedStatus = 201;

      const response = await request(app)
        .post(path)
        .send(poolsMock[0])
        .expect(expectedStatus);

      expect(response.body.poolWithId).toHaveProperty(
        expectedNewPoolCreate,
        "beach pool",
      );
    });
  });

  describe("When it receives an invalid pool in the body's request", () => {
    test("Then it should call the response's method 400 and the message 'Error creating a new pool'", async () => {
      const path = "/pools/create";
      const expectedStatus = 400;
      const expectedMessage = "Error creating a new pool";
      const invalidPool = {};

      const response = await request(app)
        .post(path)
        .send(invalidPool)
        .expect(expectedStatus);
      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
