import { Request, Response } from "express";
import logger from "../../utils/logger";

const env = process.env.NODE_ENV;

const errorHandler = (err: any, req: Request, res: Response) => {
  const staticError = "Internal error";

  const { statusCode, status, statusText, message } = err;

  const statusHTTP = statusCode || status || 500;
  const detail = message || statusText || staticError;

  logger.error(`API: Error message:${detail}`);

  res.status(statusHTTP).json({
    status: statusHTTP,
    message: env === "production" ? staticError : detail,
  });
};

export default errorHandler;
