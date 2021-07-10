import React from "react";
import { Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

import ViewHome from "./ViewHome";
import ViewLogin from "./ViewLogin";
import ViewSignup from "./ViewSignup";

const App = () => {
  return (
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/components" component={Components} />
      <Route path="/signup" component={ViewSignup} />
      <Route path="/login" component={ViewLogin} />
      <Route path="/" component={ViewHome} />
    </Switch>
  );
};

export default App;
