import { UrlId } from "../src/UrlId";
import { UrlIdValidationError } from "../src/UrlIdValidationError";

describe("UrlId", () => {
  it("Should create an instance of UrlId", () => {
    const urlId = new UrlId("AZERTYUIOP123456789");
    expect(urlId).toBeInstanceOf(UrlId);
  });

  it("Should throw an error if the urlId is too short", () => {
    expect(() => new UrlId("AZE")).toThrowError(
      new UrlIdValidationError("UrlId is too short")
    );
  });
});
