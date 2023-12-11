import request from "supertest";
import app from "../../../../server/app";
import poolsMock from "../../mooks/poolsMock";
import Pool from "../../model/Pool";

describe("Given a DELETE /pools/:poolId endpoint", () => {
  describe("When it receives a request with an incorrect pool id", () => {
    test("Then it should respond with a 400 status code and an error message", async () => {
      const expectedStatusCode = 400;
      const incorrectPath = "/pools/wrongpath";
      const expectedErrorMessage = "Pool can not be deleted";

      const response = await request(app)
        .delete(incorrectPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
