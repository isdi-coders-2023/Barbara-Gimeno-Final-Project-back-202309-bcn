import type { NextFunction, Request, Response } from "express";
import { type PoolsRepositoryStructure } from "../repository/typesRepository.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type PoolRequestWithoutId } from "../types.js";

class PoolsController {
  constructor(private readonly poolsRepository: PoolsRepositoryStructure) {}

  public getPools = async (_req: Request, res: Response): Promise<void> => {
    const pools = await this.poolsRepository.getPools();

    res.status(200).json({ pools });
  };

  deletePool = async (
    req: Request<{ poolId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { poolId } = req.params;
    try {
      await this.poolsRepository.deletePool(poolId);
      res.status(200).json({});
    } catch {
      const error = new CustomError("Pool can not be deleted", 400);
      next(error);
    }
  };

  public addPool = async (
    req: PoolRequestWithoutId,
    res: Response,
    next: NextFunction,
  ) => {
    const pool = req.body;

    try {
      const poolWithId = await this.poolsRepository.addPool(pool);

      res.status(201).json({
        message: "Pool has been created succesfully",
        poolWithId,
      });
    } catch (error) {
      const customError = new CustomError("Error creating a new pool", 400);

      next(customError);
    }
  };

  public getPoolById = async (
    req: Request<{ poolId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { poolId } = req.params;

      const idPool = await this.poolsRepository.getPoolById(poolId)!;

      res.status(200).json(idPool);
    } catch {
      const customError = new CustomError("Error finding a pool", 400);

      next(customError);
    }
  };
}

export default PoolsController;
