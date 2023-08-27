import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";

describe("UrlIdValidationError", () => {
  it("Should create an UrlIdValidationError", () => {
    const error = new UrlIdValidationError("UrlId is too short");

    expect(error).toBeInstanceOf(UrlIdValidationError);
    expect(error.message).toBe("UrlId is too short");
    expect(error.name).toBe("UrlIdValidationError");
  });
});
