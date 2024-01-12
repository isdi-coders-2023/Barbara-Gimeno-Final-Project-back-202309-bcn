import { Router } from "express";
import PoolsMongooseRepository from "../repository/PoolsMongooseRepository.js";
import PoolsController from "../controller/PoolsController.js";

const poolsRouter = Router();

const poolRepository = new PoolsMongooseRepository();
const poolController = new PoolsController(poolRepository);

poolsRouter.get("/", poolController.getPools);
poolsRouter.delete("/:poolId", poolController.deletePool);
poolsRouter.post("/create", poolController.addPool);
poolsRouter.get("/:poolId", poolController.getPoolById);

export default poolsRouter;
