import { Application } from "./infra/rest/Application";
import { Route } from "./infra/rest/Route";
import { SecretsByIdController } from "./infra/rest/SecretsByIdController";
import { SecretByIdRoute } from "./infra/rest/SecretsByIdRoute";
import { OneTimeSecretRetriever } from "./services/OneTimeSecretRetriever";
import { MongoSecretRepository } from "./infra/repositories/MongoSecretRepository";
import { SecretsRoute } from "./infra/rest/SecretsRoute";
import { SecretsController } from "./infra/rest/SecretsController";
import { OneTimeSecretStorer } from "./services/OneTimeSecretStorer";
import { UniqidTokenGenerator } from "./infra/externalServices/UniqidTokenGenerator";

const tokenGenerator = new UniqidTokenGenerator();
const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);

const secretsController = new SecretsController(secretStorer);
const secretsByIdController = new SecretsByIdController(secretRetriever);

const secretsRoute = new SecretsRoute(secretsController);
const secretByIdRoute = new SecretByIdRoute(secretsByIdController);

const routeList: Route[] = [];
routeList.push(secretsRoute);
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
