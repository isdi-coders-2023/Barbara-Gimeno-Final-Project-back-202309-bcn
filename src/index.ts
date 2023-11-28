import debugCreator from "debug";
import chalk from "chalk";
import { connectToDatabase } from "./database";
import { startServer } from "./server/app";

const debug = debugCreator("root:index");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MONGODB conection"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
