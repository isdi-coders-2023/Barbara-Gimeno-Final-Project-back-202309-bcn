import "dotenv/config";
import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";

app.use(morgan("dev"));

app.use(express.json());

const port = process.env.PORT;
const front = process.env.NETLIFY_URL!;

app.use(cors({ origin: [front, `http://localhost:${port}/`] }));

app.get("/", pingRouter);
