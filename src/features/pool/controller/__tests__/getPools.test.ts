import type { Request, Response } from "express";
import poolsMock from "../../mooks/poolsMock";
import type { PoolsRepositoryStructure } from "../../repository/typesRepository";
import PoolsController from "../PoolsController";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given a PoolController's getPools method", () => {
  const poolsRepository: Pick<PoolsRepositoryStructure, "getPools"> = {
    getPools: jest.fn().mockResolvedValue(poolsMock),
  };

  const poolsController = new PoolsController(poolsRepository);

  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    test("Then it should call it by method status with 200 status code", async () => {
      const expectdStatusCode = 200;

      await poolsController.getPools(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectdStatusCode);
    });

    test("Then it should call its method json with 2 shoes in it's body: 'beach pool' and 'infinity pool'", async () => {
      const expectedJsonBody = { pools: poolsMock };

      await poolsController.getPools(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedJsonBody);
    });
  });
});
