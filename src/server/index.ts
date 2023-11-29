import "dotenv/config";
import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import { generalError, notFound } from "./middleware/errors/errors.js";

const port = process.env.PORT;
const front = process.env.NETLIFY_URL!;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: [front, `http://localhost:${port}/`] }));

app.get("/", pingRouter);

app.use(notFound);
app.use(generalError);
