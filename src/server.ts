import { Application } from "./rest/Application";
import { Route } from "./rest/Route";
import { SecretsByIdController } from "./rest/SecretsByIdController";
import { SecretByIdRoute } from "./rest/SecretsByIdRoute";

const secretsByIdController = new SecretsByIdController();
const secretByIdRoute = new SecretByIdRoute(secretsByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
