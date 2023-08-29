import { Application } from "express";
import { Route } from "./Route";
import { SecretsByIdController } from "../controllers/SecretsByIdController";

export class SecretByIdRoute implements Route {
  constructor(private SecretsByIdController: SecretsByIdController) {}

  mountRoute(application: Application): void {
    application
      .route("/api/v1/secrets/:urlId")
      .get(this.SecretsByIdController.retrieveSecret);
  }
}
