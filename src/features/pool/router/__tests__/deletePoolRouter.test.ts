import request from "supertest";
import app from "../../../../server/app";
import poolsMock from "../../mooks/poolsMock";

describe("Given a DELETE /pools/:poolId endpoint", () => {
  // Describe("When it receives a request with a correct pool id", () => {
  //   test("Then it should respond with a 200 status code and an empty json object in its body", async () => {
  //     const expectedStatusCode = 200;
  //     const { _id, ...poolMockData } = poolsMock[0];

  //     const shoe = await Pool.create(poolMockData);
  //     const path = `/pools/${pool._id}`;

  //     const response = await request(app)
  //       .delete(path)
  //       .expect(expectedStatusCode);

  //     expect(response.body).toStrictEqual({});
  //   });
  // });

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
