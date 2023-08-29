import { Secret } from "../../../src/domain/models/Secret";
import { UrlId } from "../../../src/domain/models/UrlId";
import { OneTimeSecretStorer } from "../../../src/services/OneTimeSecretStorer";
import { SecretRepository } from "../../../src/services/SecretRepository";
import { TokenGenerator } from "../../../src/services/TokenGenerator";

describe("OneTimeSecretStorer Tests", () => {
  it("should store a secret in the repository and return a UrlId", async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const tokenGenerator: TokenGenerator = {
      generateToken: jest.fn().mockReturnValue("123456qwerty"),
    };

    const oneTimeSecretStorer = new OneTimeSecretStorer(
      secretRepository,
      tokenGenerator
    );

    const secret = new Secret("1239231kwed");
    const urlId = new UrlId("123456qwerty");
    expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(urlId);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(urlId, secret);
  });
});
