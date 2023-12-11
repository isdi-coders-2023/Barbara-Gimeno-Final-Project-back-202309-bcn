import { type PoolDataStructure, type PoolStructure } from "../types.js";

export interface PoolsRepositoryStructure {
  getPools: () => Promise<PoolStructure[]>;
  deletePool: (id: string) => Promise<void>;
  addPool: (pool: PoolDataStructure) => Promise<PoolStructure>;
}
