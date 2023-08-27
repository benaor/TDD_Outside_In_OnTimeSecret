import { SecretRetriever } from "./services/SecretRetriever";
import { Application } from "./infra/rest/Application";
import { Route } from "./infra/rest/Route";
import { SecretsByIdController } from "./infra/rest/SecretsByIdController";
import { SecretByIdRoute } from "./infra/rest/SecretsByIdRoute";

const secretRetriever: SecretRetriever = {
  retrieveSecretByUrlId: function () {
    throw new Error("Not implemented");
  },
};

const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretByIdRoute = new SecretByIdRoute(secretsByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
