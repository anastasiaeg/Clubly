import React, { Component } from "react";
import {
  Button,
  Card,
  ControlGroup,
  Elevation,
  H2,
  InputGroup,
  Text
} from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./login.css";
import * as routes from "../../constants/routes";
import { authService } from "../../services/authService";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      loggedIn: false
    };
  }

  userInfo = {
    email: "",
    password: ""
  };

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

  onLogin = event => {
    if (typeof event.preventDefault !== "undefined") {
      event.preventDefault();
    }
    authService
      .login(this.userInfo.email, this.userInfo.password)
      .then(response => {
        if (response.data) {
          this.setState({
            loggedIn: true
          });
        }
      });
    return false;
  };

  render() {
    const { width, height, loggedIn } = this.state;
    if (loggedIn) {
      return (
        <Redirect
          to={{
            pathname:
              this.userInfo.email === "admin@ncsu.edu" ? routes.ADMIN : "/",
            state: { from: this.props.location }
          }}
        />
      );
    }
    return (
      <div className="login" style={{ width: width, height: height }}>
        <Card elevation={Elevation.TWO} className="login-card">
          <H2>Welcome to Clubly!</H2>
          <br />
          <form onSubmit={this.onLogin}>
            <ControlGroup vertical={true}>
              <InputGroup
                large={true}
                placeholder="Email"
                type="email"
                onChange={element => {
                  this.userInfo.email = element.target.value;
                }}
              />
              <InputGroup
                large={true}
                placeholder="Password"
                type="password"
                onChange={element => {
                  this.userInfo.password = element.target.value;
                }}
              />
              <Button
                large={true}
                icon="arrow-right"
                text="Login"
                type="submit"
              />
            </ControlGroup>
          </form>
          <br />
          <Text>
            <Link to={routes.SIGN_UP}>Don't have an account?</Link>
          </Text>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
