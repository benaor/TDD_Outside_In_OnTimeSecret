import { UrlIdValidationError } from "../errors/UrlIdValidationError";

export class UrlId {
  constructor(private urlId: string) {
    if (urlId.length < 10) throw new UrlIdValidationError("UrlId is too short");
    this.urlId = urlId;
  }

  toString(): string {
    return this.urlId;
  }
}
