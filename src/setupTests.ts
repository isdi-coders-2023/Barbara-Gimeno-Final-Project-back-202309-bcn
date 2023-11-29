import mongoose from "mongoose";
import { connectToDatabase } from "./database/index.js";
import "./server/index.js";
import MongoMemoryServer from "mongodb-memory-server-core";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongodb = server.getUri();
  await connectToDatabase(mongodb);
});

afterAll(async () => {
  await server.stop();
  await mongoose.disconnect();
});
