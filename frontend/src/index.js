import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import { queryClient } from "api/queryClient ";
import "assets/scss/material-kit-react.scss?v=1.10.0";

import App from "./components/App";

const hist = createBrowserHistory();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router history={hist}>
      <App />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);
