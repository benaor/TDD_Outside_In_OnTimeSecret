import { Application } from "express";
import { Route } from "./Route";
import { SecretByIdController } from "./SecretByIdController";

export class SecretByIdRoute implements Route {
  constructor(private secretByIdController: SecretByIdController) {}

  mountRoute(application: Application): void {
    application
      .route("/api/v1/secrets/:urlId")
      .get(this.secretByIdController.retrieveSecret);
  }
}
