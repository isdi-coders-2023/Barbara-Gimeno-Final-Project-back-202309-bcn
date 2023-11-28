import express from "express";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("root:server:app");

const app = express();
app.disabled("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green(`Listening on port ${chalk.blue(port)}`));
  });
};

export default app;
