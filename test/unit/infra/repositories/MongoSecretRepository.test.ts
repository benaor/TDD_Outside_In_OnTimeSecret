import mongoose from "mongoose";
import { MongoSecretRepository } from "../../../../src/infra/repositories/MongoSecretRepository";
import { UrlId } from "../../../../src/domain/models/UrlId";
import { SecretModel } from "../../../../src/infra/repositories/SecretModel";
import { Secret } from "../../../../src/domain/models/Secret";

describe("MongoSecretRepository tets", () => {
  it("Should connect to the database", () => {
    mongoose.connect = jest.fn();

    new MongoSecretRepository();

    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      "mongodb://localhost:27017/onetimesecretoutsidein"
    );
  });

  it("Should not to connect to the database when connection is already started", () => {
    mongoose.connect = jest.fn();
    // @ts-ignore
    mongoose.connection.readyState = 1;

    new MongoSecretRepository();

    expect(mongoose.connect).toBeCalledTimes(0);
  });

  it("Should return a null object when the secret is not found", async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    mongoose.connect = jest.fn();
    // @ts-ignore
    mongoose.connection.readyState = 1;

    const urlId = new UrlId("123456789azertyuiop");
    const mongoRepo = new MongoSecretRepository();

    expect(mongoose.connect).toBeCalledTimes(0);
    expect(await mongoRepo.getSecretByUrlId(urlId)).toBeNull();
  });

  it("Should return the secret  when it's found", async () => {
    // @ts-ignore
    mongoose.connection.readyState = 1;
    mongoose.connect = jest.fn();
    SecretModel.findOne = jest.fn().mockResolvedValue({
      secret: "my secret",
    });

    const urlId = new UrlId("123456789azertyuiop");
    const mongoRepo = new MongoSecretRepository();

    await mongoRepo.getSecretByUrlId(urlId);

    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith(urlId);
  });

  it("Should remove the secret from the database", async () => {
    // @ts-ignore
    mongoose.connection.readyState = 1;
    mongoose.connect = jest.fn();
    SecretModel.deleteOne = jest.fn();

    const urlId = new UrlId("123456789azertyuiop");
    const mongoRepo = new MongoSecretRepository();

    await mongoRepo.removeSecretByUrlId(urlId);

    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith(urlId);
  });

  it("should store urlId and Secret into the database", async () => {
    // @ts-ignore
    mongoose.connection.readyState = 1;
    SecretModel.create = jest.fn();
    mongoose.connect = jest.fn();

    const urlId = new UrlId("123456rtyree");
    const secret = new Secret("asd3e324dsas");
    const mongoSecretRepository = new MongoSecretRepository();
    await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);
    expect(SecretModel.create).toBeCalledTimes(1);
    expect(SecretModel.create).toBeCalledWith({
      urlId: "123456rtyree",
      secret: "asd3e324dsas",
    });
  });
});
