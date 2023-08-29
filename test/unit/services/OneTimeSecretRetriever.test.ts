import { SecretNotFoundError } from "../../../src/domain/errors/SecretNotFoundError";
import { Secret } from "../../../src/domain/models/Secret";
import { UrlId } from "../../../src/domain/models/UrlId";
import { OneTimeSecretRetriever } from "../../../src/services/OneTimeSecretRetriever";
import { SecretRepository } from "../../../src/services/SecretRepository";

describe("OneTimeSecretRetriever", () => {
  it("Should throw an error if the secret was not found", () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };

    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId("AZERTYUIOP123456789");

    expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(urlId);
  });

  it("Should return a secret when it is found", async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(new Secret("my secret")),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };

    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId("AZERTYUIOP123456789");

    expect(await oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).toEqual(
      new Secret("my secret")
    );

    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(urlId);

    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.removeSecretByUrlId).toBeCalledWith(urlId);
  });
});
