import supertest from "supertest";
import server from "../../src/server";
import { SecretModel } from "../../src/infra/repositories/SecretModel";

const request = supertest(server);

describe("Get secrets integration tests", () => {
  it("Should return an error when the the UrlId isn't valid", async () => {
    const response = await request.get("/api/v1/secrets/2short");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "UrlIdValidationError",
      message: "UrlId is too short",
    });
  });

  it("Should return an error when the secret doesn't exist in the system", async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);

    const response = await request.get("/api/v1/secrets/nonexistantsecret");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: "SecretNotFoundError",
      message: "Secret was not found in the system",
    });
  });

  it("Should retrieve a secret from the system", async () => {
    SecretModel.deleteOne = jest.fn();
    SecretModel.findOne = jest.fn().mockResolvedValue({
      secret: "my secret",
    });

    const response = await request.get("/api/v1/secrets/existantsecret");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      secret: "my secret",
    });
  });

  it("Should Throw a 500 error when unexpected error is throw", async () => {});
});
