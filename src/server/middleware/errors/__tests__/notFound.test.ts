import type { NextFunction, Request, Response } from "express";
import type CustomError from "../../../../CustomError/CustomError";
import { notFound } from "../errors";

describe("Given a notFound controller", () => {
  describe("When it receives a next function", () => {
    test("Then it should call with a status 404n and 'notFound'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError: Partial<CustomError> = {
        statusCode: 404,
        message: "Page not found",
      };

      notFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
