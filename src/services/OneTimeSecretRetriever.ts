import { SecretNotFoundError } from "../domain/errors/SecretNotFoundError";
import { Secret } from "../domain/models/Secret";
import { UrlId } from "../domain/models/UrlId";
import { SecretRepository } from "./SecretRepository";
import { SecretRetriever } from "./SecretRetriever";
import { TokenGenerator } from "./TokenGenerator";

export class OneTimeSecretRetriever implements SecretRetriever {
  constructor(private secretRepository: SecretRepository) {}

  async retrieveSecretByUrlId(urlId: UrlId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlId(urlId);
    if (secret === null) throw new SecretNotFoundError();

    this.secretRepository.removeSecretByUrlId(urlId);
    return secret;
  }
}
