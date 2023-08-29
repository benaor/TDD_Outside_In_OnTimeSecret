import { TokenGenerator } from "../../../infra/externalServices/TokenGenerator";
import { SecretRepository } from "../../../infra/repositories/SecretRepository";
import { Secret } from "../../models/Secret";
import { UrlId } from "../../models/UrlId";
import { SecretStorer } from "./SecretStorer";

export class OneTimeSecretStorer implements SecretStorer {
  constructor(
    private secretRepository: SecretRepository,
    private tokenGenerator: TokenGenerator
  ) {}

  async storeSecret(secret: Secret): Promise<UrlId> {
    const token = this.tokenGenerator.generateToken();
    const urlId = new UrlId(token);
    await this.secretRepository.storeUrlIdAndSecret(urlId, secret);
    return urlId;
  }
}
