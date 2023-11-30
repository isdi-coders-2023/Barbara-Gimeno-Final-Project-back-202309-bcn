import Pool from "../model/Pool.js";
import { type PoolStructure } from "../types.js";
import { type PoolRepositoryStructure } from "./typesRepository.js";

const limit = 10;
class PoolMongooseRepository implements PoolRepositoryStructure {
  public getPools = async (): Promise<PoolStructure[]> => {
    const pools = await Pool.find().limit(limit);

    return pools;
  };
}

export default PoolMongooseRepository;
