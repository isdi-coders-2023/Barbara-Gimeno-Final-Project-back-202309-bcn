import { type Response, type Request, type NextFunction } from "express";
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
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  const poolMock = poolsIdMock;

  describe("When it receives a Request with a valid pool id", () => {
    const req: Pick<Request, "params"> = {
      params: { poolId: "6572edf668fea6caed13b908" },
    };

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
  });

  describe("When it receives a Request with an incorrect pool id", () => {
    test("Then it should call its response's status method with 200 Status Code", async () => {
      const wrongPoolId = "invalidId";
      const expectedError: Partial<CustomError> = {
        message: "Couldn't find the pool",
        statusCode: 400,
      };
      const req: Pick<Request, "params"> = {
        params: { poolId: wrongPoolId },
      };

      const poolRepository: Pick<PoolsMongooseRepository, "getPoolById"> = {
        getPoolById: jest.fn().mockRejectedValue(expectedError),
      };

      const poolController = new PoolsController(
        poolRepository as PoolsMongooseRepository,
      );

      await poolController.getPoolById(
        req as PoolRequestById,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
