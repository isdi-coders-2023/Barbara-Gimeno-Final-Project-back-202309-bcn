import { Router } from "express";
import PoolMongooseRepository from "../repository/PoolMongooseRepository.js";
import PoolsController from "../controller/PoolController.js";

const poolsRouter = Router();

const poolRepository = new PoolMongooseRepository();
const poolController = new PoolsController(poolRepository);

poolsRouter.get("/", poolController.getPools);

export default poolsRouter;
