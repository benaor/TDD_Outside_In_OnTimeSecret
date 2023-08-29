import { NextFunction, Request, Response } from "express";
import { SecretNotFoundError } from "../../../domain/errors/SecretNotFoundError";
import { UrlIdValidationError } from "../../../domain/errors/UrlIdValidationError";

export function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { message, name } = error;

  if (error instanceof UrlIdValidationError) {
    response.status(400).json({
      name,
      message,
    });
  } else if (error instanceof SecretNotFoundError) {
    response.status(404).json({
      name,
      message,
    });
  } else {
    response.status(500).json({
      name: "InternalServerError",
      message: "Something went wrong",
    });
  }
}
