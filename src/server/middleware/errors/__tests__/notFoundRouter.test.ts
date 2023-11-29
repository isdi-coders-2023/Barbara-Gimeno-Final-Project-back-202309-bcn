import request from "supertest";
import app from "../../../app";

describe("Given GET/fail endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 'Page not found' message and a 404 status code", async () => {
      const expectedMessage = "Page not found";
      const expectStatusCode = 404;
      const path = "/fail";

      const response = await request(app).get(path).expect(expectStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe(expectedMessage);
    });
  });
});
