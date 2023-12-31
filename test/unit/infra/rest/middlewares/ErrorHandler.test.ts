import { request, response, Request, Response } from "express";
import { ErrorHandler } from "../../../../../src/infra/rest/middlewares/ErrorHandler";
import { UrlIdValidationError } from "../../../../../src/domain/errors/UrlIdValidationError";
import { SecretNotFoundError } from "../../../../../src/domain/errors/SecretNotFoundError";
import { RequestValidationError } from "../../../../../src/infra/rest/controllers/RequestValidationError";
import { SecretValidationError } from "../../../../../src/domain/errors/SecretValidationError";

describe("ErrorHandler", () => {
  it("Should generate an Error response for a UrlIdValidationError", () => {
    const error = new UrlIdValidationError("UrlId is too short");
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    ErrorHandler(error, req, res, next);

    expect(next).toBeCalledTimes(0);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "UrlIdValidationError",
      message: "UrlId is too short",
    });
  });

  it("Should generate an Error response for a SecretNotFoundError", () => {
    const error = new SecretNotFoundError();
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    ErrorHandler(error, req, res, next);

    expect(next).toBeCalledTimes(0);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "SecretNotFoundError",
      message: "Secret was not found in the system",
    });
  });

  it("Should generate a generic error for uncontrolled situations", () => {
    const error = new Error("There is on FIRE !!!");
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    ErrorHandler(error, req, res, next);

    expect(next).toBeCalledTimes(0);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "InternalServerError",
      message: "Something went wrong",
    });
  });

  it("should generate an Error response for a RequestValidationError", () => {
    const error = new RequestValidationError("Request body is not valid");
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    ErrorHandler(error, req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "RequestValidationError",
      message: "Request body is not valid",
    });
  });

  it("should generate an Error response for a SecretValidationError", () => {
    const error = new SecretValidationError("Secret is too short");
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    ErrorHandler(error, req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "SecretValidationError",
      message: "Secret is too short",
    });
  });
});
