import { type Response, type NextFunction, type Request } from "express";
import CustomError from "../CustomError/CustomError";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("root:server:middlewares:error");

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const customError = new CustomError("Page not found", 404);
  next(customError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const privateMessage = error.customMessage ?? error.message;
  debug(chalk.red("Error: ", privateMessage));

  res.status(statusCode).json({ error: privateMessage });
};
