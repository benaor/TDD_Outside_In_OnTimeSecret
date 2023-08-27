import { Secret } from "../../../../src/domain/models/Secret";

describe("Secret", () => {
  it("Should create an Secret", () => {
    const secret = new Secret("my Secret");
    expect(secret).toBeInstanceOf(Secret);
  });

  it("Should throw an error if secret is too short", () => {
    expect(() => new Secret("Se")).toThrowError("Secret is too short");
  });

  it("Should return secret", () => {
    const secret = new Secret("my Secret");
    expect(secret.getSecret).toBe("my Secret");
  });
});
