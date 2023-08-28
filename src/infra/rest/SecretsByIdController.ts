import { Request, Response, NextFunction } from "express";
import { UrlIdValidationError } from "../../domain/errors/UrlIdValidationError";
import { UrlId } from "../../domain/models/UrlId";
import { SecretRetriever } from "../../services/SecretRetriever";

export class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  retrieveSecret = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const urlId = new UrlId(req.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId);

      res.status(200).json(secret);
    } catch (error) {
      next(error);
    }
  };
}
