import type { Request, Response } from "express";
import { type PoolsRepositoryStructure } from "../repository/typesRepository.js";

class PoolsController {
  constructor(private readonly poolsRepository: PoolsRepositoryStructure) {}

  public getPools = async (_req: Request, res: Response): Promise<void> => {
    const pools = await this.poolsRepository.getPools();

    res.status(200).json({ pools });
  };
}

export default PoolsController;
