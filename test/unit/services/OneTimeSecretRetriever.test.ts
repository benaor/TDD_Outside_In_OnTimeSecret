import { SecretNotFoundError } from "../../../src/domain/errors/SecretNotFoundError";
import { UrlId } from "../../../src/domain/models/UrlId";
import { OneTimeSecretRetriever } from "../../../src/services/OneTimeSecretRetriever";
import { SecretRepository } from "../../../src/services/SecretRepository";

describe("OneTimeSecretRetriever", () => {
  it("Should throw an error if the secret was not found", () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
    };

    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId("AZERTYUIOP123456789");

    expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(urlId);
  });
});