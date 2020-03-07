import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as routes from "./constants/routes";
import PrivateRoute from "./components/Common/PrivateRoute";
import ProfilePage from "./components/Profile/ProfilePage";
import OrgManagementPage from "./components/OrgManagement/OrgManagementPage";
import OrgPage from "./components/OrgManagement/OrgPage";
import EventPage from "./components/OrgManagement/EventPage";
import CalendarPage from "./components/Calendar/CalendarPage";
import SearchPage from "./components/Search/SearchPage";
import AdminManagementPage from "./components/Admin/AdminManagementPage";
import LoginPage from "./components/Auth/LoginPage";
import SignUpPage from "./components/Auth/SignUpPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path={routes.LOGIN} component={LoginPage} />
            <Route path={routes.SIGN_UP} component={SignUpPage} />
            <PrivateRoute exact path={routes.PROFILE} page={ProfilePage} />
            <PrivateRoute
              exact
              path={routes.MANAGE_ORGS}
              page={OrgManagementPage}
            />
            <PrivateRoute exact path={routes.SEARCH} page={SearchPage} />
            <PrivateRoute exact path={routes.CALENDAR} page={CalendarPage} />
            <PrivateRoute path={routes.ORG + "/:club_id"} page={OrgPage} />
            <PrivateRoute path={routes.EVENT + "/:event_id"} page={EventPage} />
            <PrivateRoute path={routes.USER + "/:user_id"} page={EventPage} />
            <PrivateRoute
              exact
              path={routes.ADMIN}
              page={AdminManagementPage}
            />
            <PrivateRoute exact path="/" page={CalendarPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
