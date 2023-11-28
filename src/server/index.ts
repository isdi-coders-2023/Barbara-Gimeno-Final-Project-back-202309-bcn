import morgan from "morgan";
import app from "./app";
import express from "express";
import cors from "cors";

app.use(morgan("dev"));

app.use(express.json());

const port = process.env.PORT;
const front = process.env.NETLIFY_URL!;

app.use(cors({ origin: [front, `http://localhost:${port}/`] }));
