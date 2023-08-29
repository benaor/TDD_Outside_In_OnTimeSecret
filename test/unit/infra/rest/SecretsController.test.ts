import { request, Request, response, Response } from "express";
import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";
import { Secret } from "../../../../src/domain/models/Secret";
import { UrlId } from "../../../../src/domain/models/UrlId";
import { SecretsController } from "../../../../src/infra/rest/SecretsController";
import { RequestValidationError } from "../../../../src/infra/rest/RequestValidationError";
import { SecretStorer } from "../../../../src/services/SecretStorer";

describe("SecretsController Tests", () => {
  it("should throw an error if the secret is not present in the body", () => {
    const req: Request = expect.any(request);
    req.body = {
      bad: "bad body",
    };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);

    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError("Request body format is not valid")
    );
  });

  it("should throw an error if the secret is not a string", () => {
    const req: Request = expect.any(request);
    req.body = {
      secret: 473473473,
    };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);

    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError("Secret is not a string")
    );
  });

  it("should throw an error if the secret is too short", () => {
    const req: Request = expect.any(request);
    req.body = {
      secret: "qa",
    };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);

    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new SecretValidationError("Secret is too short")
    );
  });

  it("should store the secret and return the urlId", async () => {
    const req: Request = expect.any(request);
    req.body = {
      secret: "secretwillnotguessbyasimpleman",
    };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest
        .fn()
        .mockResolvedValue(new UrlId("aqsxcdzedfvbrtghyuk455675")),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretStorer.storeSecret).toBeCalledTimes(1);
    expect(secretStorer.storeSecret).toBeCalledWith(
      new Secret("secretwillnotguessbyasimpleman")
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(new UrlId("aqsxcdzedfvbrtghyuk455675"));
  });
});
