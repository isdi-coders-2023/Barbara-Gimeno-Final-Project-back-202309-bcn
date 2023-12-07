import type { Request, Response, NextFunction } from "express";

import type CustomError from "../../../../CustomError/CustomError";
import type PoolsMongooseRepository from "../../repository/PoolsMongooseRepository";
import PoolsController from "../PoolsController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a PoolsController's deletePool method", () => {
  const req: Pick<Request<{ poolId: string }>, "params"> = {
    params: { poolId: "6565cdaa1d9be1bc1e6af452" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a correct pool id", () => {
    const poolsRepository: Pick<PoolsMongooseRepository, "deletePool"> = {
      deletePool: jest.fn(),
    };

    test("Then it should call the response's status method with a 200 status code", async () => {
      const expectedStatusCode = 200;

      const poolsController = new PoolsController(
        poolsRepository as PoolsMongooseRepository,
      );

      await poolsController.deletePool(
        req as Request<{ poolId: string }>,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with an '{}'", async () => {
      const poolsController = new PoolsController(
        poolsRepository as PoolsMongooseRepository,
      );

      await poolsController.deletePool(
        req as Request<{ poolId: string }>,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe("When it receives a request with an incorrect pool id", () => {
    test("Then it should call its next function with a custom error", async () => {
      const poolsRepository: PoolsMongooseRepository = {
        getPools: jest.fn(),
        deletePool: jest.fn().mockRejectedValue(null),
      };

      const poolsController = new PoolsController(poolsRepository);

      await poolsController.deletePool(
        req as Request<{ poolId: string }>,
        res as Response,
        next,
      );

      const expectedError: Partial<CustomError> = {
        message: "Pool can not be deleted",
        statusCode: 400,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
