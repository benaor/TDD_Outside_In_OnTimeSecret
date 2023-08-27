import { SecretNotFoundError } from "../../../../src/domain/errors/SecretNotFoundError";

describe("SecretNotFoundError", () => {
  it("Should create an SecretNotFoundError", () => {
    const error = new SecretNotFoundError();

    expect(error).toBeInstanceOf(SecretNotFoundError);
    expect(error.message).toBe("Secret was not found in the system");
    expect(error.name).toBe("SecretNotFoundError");
  });
});
