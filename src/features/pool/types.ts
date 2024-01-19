import { type Request } from "express";

export interface PoolDataStructure {
  title: string;
  measuresLong: number;
  measuresHigh: number;
  measuresWide: number;
  since: number;
  depuration: string;
  material: string;
  image: string;
}

export interface PoolStructure extends PoolDataStructure {
  _id: string;
}

export type PoolRequestWithoutId = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  PoolDataStructure
>;

export type PoolRequestById = Request<
  { poolId: string },
  Record<string, unknown>,
  PoolDataStructure
>;
