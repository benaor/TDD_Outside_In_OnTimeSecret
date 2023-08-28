import { Application } from "./infra/rest/Application";
import { Route } from "./infra/rest/Route";
import { SecretsByIdController } from "./infra/rest/SecretsByIdController";
import { SecretByIdRoute } from "./infra/rest/SecretsByIdRoute";
import { OneTimeSecretRetriever } from "./services/OneTimeSecretRetriever";
import { MongoSecretRepository } from "./infra/repositories/MongoSecretRepository";

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretByIdRoute = new SecretByIdRoute(secretsByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
