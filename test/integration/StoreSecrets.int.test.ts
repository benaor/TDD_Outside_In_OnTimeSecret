import supertest from "supertest";
import server from "../../src/server";
import { SecretModel } from "../../src/infra/repositories/SecretModel";

const request = supertest(server);

describe("Store secrets integration tests", () => {
  it("should return an error if the body is not present in the request", async () => {
    const response = await request.post("/api/v1/secrets");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Request body format is not valid",
    });
  });
  it("should return an error if the body does not have a secret", async () => {
    const response = await request.post("/api/v1/secrets").send({
      badproperty: "I should be a secret",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Request body format is not valid",
    });
  });

  it("should return an error if the secret is not a string", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secret: 123455667787,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Secret is not a string",
    });
  });
  it("should return an error if the secret is too short", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secret: "se",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "SecretValidationError",
      message: "Secret is too short",
    });
  });
  it("should store a secret and return the urlId", async () => {
    SecretModel.create = jest.fn();

    const response = await request.post("/api/v1/secrets").send({
      secret: "myvalidsecret123",
    });

    expect(response.status).toBe(201);
    expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
  });
  xit("Should return an unhandled exception error", () => {});
});
