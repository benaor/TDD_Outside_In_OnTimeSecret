import { Request, Response, NextFunction } from "express";

export class SecretsController {
  storeSecret = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Not implemented");
  };
}
