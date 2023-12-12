import type { NextFunction, Response } from "express";
import type CustomError from "../../../../CustomError/CustomError";
import poolsMock from "../../mooks/poolsMock";
import { type PoolsRepositoryStructure } from "../../repository/typesRepository";
import PoolsController from "../PoolsController";
import type PoolsMongooseRepository from "../../repository/PoolsMongooseRepository";
import { type PoolRequestWithoutId } from "../../types";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a PoolController's addPool method", () => {
  const { ...newPoolData } = poolsMock[0];

  const req: Pick<PoolRequestWithoutId, "body"> = {
    body: newPoolData,
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a correct pool Data in the body", () => {
    const poolsRepository: Pick<PoolsRepositoryStructure, "addPool"> = {
      addPool: jest.fn().mockResolvedValue(newPoolData),
    };

    const poolsController = new PoolsController(
      poolsRepository as PoolsRepositoryStructure,
    );

    test("Then it should call the method status with a 201", async () => {
      const expectedStatusCode = 201;

      await poolsController.addPool(
        req as PoolRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the new pool", async () => {
      const text = "Pool has been created succesfully";
      const expectedMessage = { message: text, poolWithId: poolsMock[0] };

      await poolsController.addPool(
        req as PoolRequestWithoutId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a request and there is an error", () => {
    test("Then it should call the Next function with the message 'Error creating a new pool'", async () => {
      const poolRepository: Pick<PoolsMongooseRepository, "addPool"> = {
        addPool: jest.fn().mockRejectedValue(null),
      };

      const poolsController = new PoolsController(
        poolRepository as PoolsMongooseRepository,
      );

      await poolsController.addPool(
        req as PoolRequestWithoutId,
        res as Response,
        next,
      );

      const expectedError: Partial<CustomError> = {
        message: "Error creating a new pool",
        statusCode: 400,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
