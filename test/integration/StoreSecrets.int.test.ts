import supertest from "supertest";
import server from "../../src/server";

const request = supertest(server);

describe("Store secrets integration tests", () => {
  it("Should return an error if the body is not present in the request", async () => {
    const response = await request.post("/api/v1/secrets");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Request body is not provided",
    });
  });

  xit("Should return an error if the body does not have a secret", () => {});
  xit("Should return an error if the secret is not a string", () => {});
  xit("Should return an error if the secret is too short", () => {});
  xit("Should store a secret and return the urlId", () => {});
  xit("Should return an unhandled exception error", () => {});
});
