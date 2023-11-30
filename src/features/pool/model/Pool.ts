import { Schema, model } from "mongoose";
import type { PoolStructure } from "../types";

const poolSchema = new Schema<PoolStructure>({
  title: {
    type: String,
    required: true,
  },
  measuresLong: {
    type: Number,
    required: true,
  },

  measuresHigh: {
    type: Number,
    required: true,
  },

  measuresWide: {
    type: Number,
    required: true,
  },

  since: {
    type: Number,
    required: true,
  },

  depuration: {
    type: String,
    required: true,
  },

  material: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const Pool = model("Pool", poolSchema, "pools");

export default Pool;
