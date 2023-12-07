import type { NextFunction, Request, Response } from "express";
import { type PoolsRepositoryStructure } from "../repository/typesRepository.js";
import CustomError from "../../../CustomError/CustomError.js";

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
}

export default PoolsController;
