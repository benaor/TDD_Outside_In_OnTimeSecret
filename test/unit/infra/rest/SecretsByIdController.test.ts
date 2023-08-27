import { request, Request, response, Response } from "express";
import { SecretsByIdController } from "../../../../src/infra/rest/SecretsByIdController";
import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";
import { SecretNotFoundError } from "../../../../src/domain/errors/SecretNotFoundError";
import { SecretRetriever } from "../../../../src/services/SecretRetriever";
import { UrlId } from "../../../../src/domain/models/UrlId";

describe("SecretsByIdController", () => {
  it("should throw an error if the urlId is too short", () => {
    const req: Request = expect.any(request);
    req.params = { urlId: "aze12" };
    const res: Response = expect.any(response);
    const next = jest.fn();
    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn(),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    secretsByIdController.retrieveSecret(req, res, next);

    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(0);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"));
  });

  it("should throw an error if the Secret was not found", () => {
    const req: Request = expect.any(request);
    req.params = { urlId: "azertyuiop123456789" };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundError();
      }),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundError());

    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(
      new UrlId("azertyuiop123456789")
    );
  });
});
