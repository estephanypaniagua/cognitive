import { CustomRoutes, RouteWithoutLayout } from "react-admin";

import ViewHome from "./ViewHome";
// import ViewSignup from "./ViewSignup";

const customRoutes: CustomRoutes = [
  <RouteWithoutLayout exact noLayout path="/landing" render={() => <ViewHome />} />,
  //   <RouteWithoutLayout exact noLayout path="/signup" render={() => <ViewSignup />} />,
];

export default customRoutes;
