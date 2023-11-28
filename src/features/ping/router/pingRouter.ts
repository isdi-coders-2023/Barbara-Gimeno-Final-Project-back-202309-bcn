import { Router } from "express";
import { PingController } from "../controller/pingController.js";

const pingRouter = Router();
const pingController = new PingController();

pingRouter.get("/", pingController.getPong);

export default pingRouter;
