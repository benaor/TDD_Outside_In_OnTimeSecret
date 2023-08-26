import { NextFunction, Request, Response } from "express";
import { UrlIdValidationError } from "./UrlIdValidationError";

export function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof UrlIdValidationError) {
    response.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
}
