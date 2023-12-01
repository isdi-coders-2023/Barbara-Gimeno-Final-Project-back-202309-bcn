import Pool from "../model/Pool.js";
import { type PoolStructure } from "../types.js";
import { type PoolsRepositoryStructure } from "./typesRepository.js";

class PoolsMongooseRepository implements PoolsRepositoryStructure {
  public getPools = async (): Promise<PoolStructure[]> => {
    const limit = 10;

    const pools = await Pool.find().limit(limit);

    return pools;
  };
}

export default PoolsMongooseRepository;
