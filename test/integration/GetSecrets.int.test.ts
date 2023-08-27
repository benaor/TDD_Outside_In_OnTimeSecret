import supertest from "supertest";
import server from "../../src/server";

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
    const response = await request.get("/api/v1/secrets/nonexistantsecret");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: "SecretNotFoundError",
      message: "Secret was not found in the system",
    });
  });

  xit("Should retrieve a secret from the system", () => {});
});
