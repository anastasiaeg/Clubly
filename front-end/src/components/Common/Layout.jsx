import React from "react";
import { Link } from "react-router-dom";
import {
  Alignment,
  Button,
  Card,
  Elevation,
  NavbarDivider,
  NavbarGroup
} from "@blueprintjs/core";
import "./common.css";
import * as routes from "../../constants/routes";
import { authService } from "../../services/authService";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth
    };
  }

  updateDimensions = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  onLogout = () => {
    authService.logout();
  };

  navbar = () => {
    const { route, user } = this.props;
    const location = route.location.pathname.split("/", 2)[1];

    if (user.type === "admin") {
      return (
        <NavbarGroup align={Alignment.LEFT} className="dont-highlight">
          <Link to={routes.ADMIN}>
            <Button
              className="bp3-minimal"
              icon="helper-management"
              text="Admin"
              large={true}
              active={location === "admin" || location === "manage_admin"}
            />
          </Link>
        </NavbarGroup>
      );
    }

    return (
      <NavbarGroup align={Alignment.LEFT} className="dont-highlight">
        <Link to={routes.PROFILE}>
          <Button
            className="bp3-minimal"
            icon="user"
            text="Profile"
            large={true}
            active={location === "profile"}
          />
        </Link>
        <NavbarDivider />
        <Link to={routes.CALENDAR}>
          <Button
            className="bp3-minimal"
            icon="calendar"
            text="Calendar"
            large={true}
            active={location === "" || location === "calendar"}
          />
        </Link>
        <NavbarDivider />
        <Link to={routes.SEARCH}>
          <Button
            className="bp3-minimal"
            icon="search"
            text="Search"
            large={true}
            active={location === "search"}
          />
        </Link>
        {user.type === "organizer" && <NavbarDivider /> && (
            <Link to={routes.MANAGE_ORGS}>
              <Button
                className="bp3-minimal"
                icon="helper-management"
                text="Manage Orgs"
                large={true}
                active={location === "org" || location === "manageOrgs"}
              />
            </Link>
          )}
      </NavbarGroup>
    );
  };

  render() {
    const { route, user } = this.props;
    const { height, width } = this.state;
    const Page = this.props.page;
    let navbarElement = this.navbar();
    return (
      <div className="layout">
        <nav className="bp3-navbar fixedToTop">
          <div
            className="center-horizontal"
            style={{
              width:
                user.type === "admin"
                  ? 100
                  : user.type === "organizer"
                    ? 600
                    : 400
            }}
          >
            <NavbarGroup align={Alignment.LEFT} className="dont-highlight">
              {navbarElement}
            </NavbarGroup>
          </div>
          <NavbarGroup align={Alignment.RIGHT}>
            <Link to={routes.LOGIN}>
              <Button
                className="bp3-minimal"
                text="Logout"
                large={true}
                onClick={this.onLogout}
              />
            </Link>
          </NavbarGroup>
        </nav>
        <Card
          elevation={Elevation.TWO}
          className="card"
          style={{ height: height - 85 + "px" }}
        >
          <Page route={route} height={height} width={width} user={user} />
        </Card>
      </div>
    );
  }
}

export default Layout;
