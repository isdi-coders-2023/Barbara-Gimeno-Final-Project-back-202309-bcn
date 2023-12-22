import Pool from "../model/Pool.js";
import { type PoolDataStructure, type PoolStructure } from "../types.js";
import { type PoolsRepositoryStructure } from "./typesRepository.js";

class PoolsMongooseRepository implements PoolsRepositoryStructure {
  public getPools = async (): Promise<PoolStructure[]> => {
    const limit = 10;

    const pools = await Pool.find().limit(limit).sort({ _id: -1 });

    return pools;
  };

  async deletePool(poolId: string): Promise<void> {
    try {
      await Pool.findByIdAndDelete(poolId);
    } catch (error) {
      throw new Error("Error deleting the pool" + (error as Error).message);
    }
  }

  async addPool(pool: PoolDataStructure): Promise<PoolStructure> {
    try {
      const newPool = await Pool.create(pool);

      return newPool;
    } catch (error) {
      throw new Error("Error creating a new pool" + (error as Error).message);
    }
  }

  public async getPoolById(id: string): Promise<PoolStructure> {
    try {
      const pool = await Pool.findById(id);

      return pool!;
    } catch (error) {
      throw new Error("Error finding a pool" + (error as Error).message);
    }
  }
}

export default PoolsMongooseRepository;
