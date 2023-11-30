import Pool from "../model/Pool.js";
import { type PoolStructure } from "../types.js";
import { type PoolRepositoryStructure } from "./typesRepository";

class PoolMongooseRepository implements PoolRepositoryStructure {
  public async getPools(): Promise<PoolStructure[]> {
    const pools = await Pool.find();

    return pools;
  }
}

export default PoolMongooseRepository;
