import { Application } from "./Application";
import { Route } from "./Route";
import { SecretByIdController } from "./SecretByIdController";
import { SecretByIdRoute } from "./SecretByIdRoute";

const secretByIdController = new SecretByIdController();
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
