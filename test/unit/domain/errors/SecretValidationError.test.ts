import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";

describe("SecretValidationError", () => {
  it("Should create an SecretValidationError", () => {
    const error = new SecretValidationError("UrlId is too short");

    expect(error).toBeInstanceOf(SecretValidationError);
    expect(error.message).toBe("UrlId is too short");
    expect(error.name).toBe("SecretValidationError");
  });
});
