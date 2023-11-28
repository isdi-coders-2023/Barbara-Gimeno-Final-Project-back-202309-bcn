import "dotenv/config";
import debugCreator from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

export const debug = debugCreator("root:src:database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.blueBright("Connected to database"));
  } catch (error) {
    debug(chalk.redBright("Fail conecction to database"));
  }
};
