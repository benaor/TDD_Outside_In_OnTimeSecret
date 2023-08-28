import mongoose from "mongoose";
import { MongoSecretRepository } from "../../../../src/infra/repositories/MongoSecretRepository";
import { UrlId } from "../../../../src/domain/models/UrlId";
import { SecretModel } from "../../../../src/infra/repositories/SecretModel";

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
});
