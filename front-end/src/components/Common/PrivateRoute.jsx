import React from "react";
import { Redirect, Route } from "react-router-dom";

// Utils
import auth from "../../utils/auth";
import Layout from "../Common/Layout";

const PrivateRoute = ({ page: Page, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.getToken("user") ? (
        <Layout route={props} page={Page} user={auth.getToken("user")} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
