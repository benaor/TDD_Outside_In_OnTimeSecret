import { Request, Response, NextFunction } from "express";
import { UrlIdValidationError } from "../../domain/errors/UrlIdValidationError";
import { UrlId } from "../../domain/models/UrlId";
import { SecretRetriever } from "../../services/SecretRetriever";

export class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  retrieveSecret = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.urlId.length < 10)
      return next(new UrlIdValidationError("UrlId is too short"));

    try {
      const urlId = new UrlId(req.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId);
    } catch (error) {
      next(error);
    }
  };
}
