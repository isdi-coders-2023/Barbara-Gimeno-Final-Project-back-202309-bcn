import type { Response, NextFunction } from "express";
import poolsIdMock from "../../mooks/poolsIdMock";
import { type PoolRequestById, type PoolRequestWithoutId } from "../../types";
import modifyPoolMock from "../../mooks/modifyPoolMock";
import type PoolsMongooseRepository from "../../repository/PoolsMongooseRepository";
import PoolsController from "../PoolsController";
import modifyPoolsMock from "../../mooks/modifyPoolMock";
import type CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an TattoosController's modifyPool method", () => {
  const req: Pick<PoolRequestWithoutId, "body" | "params"> = {
    body: poolsIdMock,
    params: { poolId: "6572edf668fea6caed13b908" },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  const modifiedPool = modifyPoolMock;

  describe("When it receives a request with an tattoo id '6572edf668fea6caed13b908', and a 'beach pool' pool and a response", () => {
    const poolRepository: Pick<PoolsMongooseRepository, "modifyPool"> = {
      modifyPool: jest.fn().mockResolvedValue(modifiedPool),
    };

    test("Then it should call the response's status method with 200", async () => {
      const expectedStatusCode = 200;

      const poolsController = new PoolsController(
        poolRepository as PoolsMongooseRepository,
      );

      await poolsController.modifyPool(
        req as PoolRequestById,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with the 'beach pool' pool modified", async () => {
      const poolsController = new PoolsController(
        poolRepository as PoolsMongooseRepository,
      );

      await poolsController.modifyPool(
        req as PoolRequestById,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ pool: modifyPoolsMock });
    });
  });

  describe("When it receives a request with a pool id, an pool and a response and there is an error", () => {
    test("Then it should call its next function with a custom error 'Couldn't modify the pool'", async () => {
      const expectedStatusCode = 400;
      const expectedErrorMessage = "Couldn't modify the pool";
      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: expectedStatusCode,
        message: expectedErrorMessage,
      };

      const poolsRepository: Pick<PoolsMongooseRepository, "modifyPool"> = {
        modifyPool: jest.fn().mockRejectedValue(null),
      };

      const poolsController = new PoolsController(
        poolsRepository as PoolsMongooseRepository,
      );

      await poolsController.modifyPool(
        req as PoolRequestById,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
