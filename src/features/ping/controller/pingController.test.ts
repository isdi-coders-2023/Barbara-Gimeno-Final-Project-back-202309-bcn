import type { Request, Response } from "express";
import { PingController } from "./pingController";

describe("Given a PingController's getPong method", () => {
  describe("When it receives a response", () => {
    const pingController = new PingController();

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call its method status with a 200 status code", () => {
      const expectedStatusCode = 200;

      pingController.getPong(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call method json with message '🏓'", () => {
      const expectedMessage = { message: "🏓" };

      pingController.getPong(req as Request, res as Response);

      expect(res.status(200).json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
