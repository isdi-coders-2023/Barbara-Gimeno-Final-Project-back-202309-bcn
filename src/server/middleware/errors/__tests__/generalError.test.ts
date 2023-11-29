import { type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalError } from "../../errors/errors";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();

  describe("When it receives a response and a 400 status code", () => {
    test("Then it should call the response's method status with status code 400", () => {
      const expectedStatusCode = 400;
      const error = new CustomError("errorMessage", expectedStatusCode);

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a response and an error with a private message", () => {
    test("Then it should call the response's method json with a 'Error' message", () => {
      const errorMessage = "Private error";
      const error = new CustomError(errorMessage, 400);

      generalError(error, req as Request, res as Response, next);

      const errorResponseBody = {
        error: errorMessage,
      };

      expect(res.json).toHaveBeenCalledWith(errorResponseBody);
    });
  });

  describe("When it receives a response and an error without status code", () => {
    test("Then it should call the response's method status with a 500 status code", () => {
      const expectedStatusCode = 500;
      const error = new Error("Error without status code");

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
