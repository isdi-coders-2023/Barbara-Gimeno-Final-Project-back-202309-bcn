import { type PoolStructure } from "../types.js";

export interface PoolsRepositoryStructure {
  getPools: () => Promise<PoolStructure[]>;
  deletePool: (id: string) => Promise<void>;
}
