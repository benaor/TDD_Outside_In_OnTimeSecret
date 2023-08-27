import { NextFunction, Request, Response } from "express";
import { SecretNotFoundError } from "../../../domain/errors/SecretNotFoundError";
import { UrlIdValidationError } from "../../../domain/errors/UrlIdValidationError";

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

  if (error instanceof SecretNotFoundError) {
    response.status(404).json({
      name: error.name,
      message: error.message,
    });
  }
}
