import { type PoolStructure } from "../types.js";

export interface PoolRepositoryStructure {
  getPools: () => Promise<PoolStructure[]>;
}
