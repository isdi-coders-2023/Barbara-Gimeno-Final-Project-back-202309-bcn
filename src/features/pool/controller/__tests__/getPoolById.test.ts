import type { Response, Request, NextFunction } from "express";
import type PoolsMongooseRepository from "../../repository/PoolsMongooseRepository";
import poolsIdMock from "../../mooks/poolsIdMock";
import PoolsController from "../PoolsController";
import { type PoolRequestById, type PoolStructure } from "../../types";
import type CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the method getPoolById in PoolsController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next: NextFunction = jest.fn();
  const poolMock = poolsIdMock;
  const req: Pick<Request, "params"> = {
    params: { poolId: "6572edf668fea6caed13b908" },
  };

  describe("When it receives a Request with a valid pool id", () => {
    const poolsRepository: Pick<PoolsMongooseRepository, "getPoolById"> = {
      getPoolById: jest.fn().mockResolvedValue(poolsIdMock),
    };

    const poolController = new PoolsController(
      poolsRepository as PoolsMongooseRepository,
    );

    test("Then it should call its response's status method with 200 Status Code", async () => {
      const expectedStatusCode = 200;

      await poolController.getPoolById(
        req as PoolRequestById,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the responses's json method with the 'beach pool' pool data in the response", async () => {
      await poolController.getPoolById(
        req as PoolRequestById,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ idPool: poolMock });
    });
  });

  describe("When it receives a Request with an incorrect pool id", () => {
    test("Then it should call its next function with a custom error", async () => {
      const expectedError: Partial<CustomError> = {
        message: "Error finding a pool",
        statusCode: 400,
      };

      const poolsRepository: Pick<PoolsMongooseRepository, "getPoolById"> = {
        getPoolById: jest.fn().mockRejectedValue(null),
      };

      const poolController = new PoolsController(
        poolsRepository as PoolsMongooseRepository,
      );

      await poolController.getPoolById(
        req as Request<{ poolId: string }>,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
