import Pool from "../model/Pool.js";
import { type PoolStructure } from "../types.js";
import { type PoolsRepositoryStructure } from "./typesRepository.js";

class PoolsMongooseRepository implements PoolsRepositoryStructure {
  public getPools = async (): Promise<PoolStructure[]> => {
    const limit = 10;

    const pools = await Pool.find().limit(limit);

    return pools;
  };

  async deletePool(poolId: string): Promise<void> {
    try {
      await Pool.findByIdAndDelete(poolId);
    } catch (error) {
      throw new Error("Error deleting the pool" + (error as Error).message);
    }
  }
}

export default PoolsMongooseRepository;
