import { Router } from "express";
import PoolsMongooseRepository from "../repository/PoolsMongooseRepository.js";
import PoolsController from "../controller/PoolsController.js";

const poolsRouter = Router();

const poolRepository = new PoolsMongooseRepository();
const poolController = new PoolsController(poolRepository);

poolsRouter.get("/", poolController.getPools);

export default poolsRouter;
