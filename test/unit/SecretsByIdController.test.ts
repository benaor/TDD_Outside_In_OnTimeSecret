import { request, Request, response, Response } from "express";
import { SecretsByIdController } from "../../src/rest/SecretsByIdController";
import { UrlIdValidationError } from "../../src/UrlIdValidationError";

describe("SecretsByIdController", () => {
  it("should throw an error if the urlId is too short", () => {
    const req: Request = expect.any(request);
    req.params = { urlId: "aze12" };

    const res: Response = expect.any(response);

    const next = jest.fn();

    const secretsByIdController = new SecretsByIdController();
    secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"));
  });
});
