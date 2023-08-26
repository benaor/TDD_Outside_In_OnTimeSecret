import { Request, Response, NextFunction } from "express";
import { UrlIdValidationError } from "./UrlIdValidationError";

export class SecretsByIdController {
  retrieveSecret = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.urlId.length < 10) {
      next(new UrlIdValidationError("UrlId is too short"));
    }
  };
}
