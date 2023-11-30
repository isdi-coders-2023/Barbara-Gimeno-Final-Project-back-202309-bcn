import type { Request, Response } from "express";
import { type PoolRepositoryStructure } from "../repository/typesRepository.js";

class PoolsController {
  constructor(private readonly poolsRepository: PoolRepositoryStructure) {}

  public getPools = async (req: Request, res: Response): Promise<void> => {
    const pools = await this.poolsRepository.getPools();

    res.status(200).json({ pools });
  };
}

export default PoolsController;
