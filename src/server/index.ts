import "dotenv/config";
import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import { generalError, notFound } from "./middleware/errors/errors.js";
import poolsRouter from "../features/pool/router/poolsRouter.js";

const allowedOptions = [
  "https://barbara-gimeno-202309-bcn-front.netlify.app",
  "http://localhost:5713",
];
const options: cors.CorsOptions = {
  origin: allowedOptions,
};

app.use(morgan("dev"));
app.use(express.json());

app.use(cors(options));

app.get("/", pingRouter);
app.use("/pools", poolsRouter);

app.use(notFound);
app.use(generalError);
