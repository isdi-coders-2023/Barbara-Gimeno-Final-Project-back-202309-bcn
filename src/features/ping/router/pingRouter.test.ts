import request from "supertest";
import app from "../../../server/app.js";
import "../../../server/index.js";

describe("Given a get / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and a message with '🏓'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "🏓";
      const requestedPath = "/";

      const response = await request(app)
        .get(requestedPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
