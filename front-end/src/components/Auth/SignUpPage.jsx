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
import "./login.css";

import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { authService } from "../../services/authService";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      signedUp: false
    };
  }

  userInfo = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
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

  onSignUp = event => {
    if (typeof event.preventDefault !== "undefined") {
      event.preventDefault();
    }
    if (this.userInfo.password.value !== this.userInfo.confirmPassword.value) {
      this.userInfo.password.setCustomValidity("Passwords Don't Match");
      return;
    } else {
      this.userInfo.password.setCustomValidity("");
    }
    authService
      .signup(
        this.userInfo.email,
        this.userInfo.password.value,
        this.userInfo.firstName,
        this.userInfo.lastName
      )
      .then(response => {
        if (response.data) {
          this.setState({
            signedUp: true
          });
        }
      });
    return false;
  };

  render() {
    const { width, height, signedUp } = this.state;
    return (
      <div className="login" style={{ width: width, height: height }}>
        <Card elevation={Elevation.TWO} className="login-card">
          <H2>Welcome to Clubly!</H2>
          <br />
          {signedUp ? (
            <Text>Please verify your email </Text>
          ) : (
            <form onSubmit={this.onSignUp}>
              <ControlGroup vertical={true}>
                <InputGroup
                  large={true}
                  required
                  placeholder="Email"
                  type="email"
                  onChange={element => {
                    this.userInfo.email = element.target.value;
                  }}
                />
                <InputGroup
                  large={true}
                  required
                  placeholder="First Name"
                  type="text"
                  onChange={element => {
                    this.userInfo.firstName = element.target.value;
                  }}
                />
                <InputGroup
                  large={true}
                  required
                  placeholder="Last Name"
                  type="text"
                  onChange={element => {
                    this.userInfo.lastName = element.target.value;
                  }}
                />
                <InputGroup
                  large={true}
                  required
                  placeholder="Password"
                  type="password"
                  onChange={element => {
                    this.userInfo.password = element.target;
                  }}
                />
                <InputGroup
                  large={true}
                  required
                  placeholder="Confirm Password"
                  type="password"
                  onChange={element => {
                    this.userInfo.confirmPassword = element.target;
                  }}
                />
                <Button
                  large={true}
                  icon="arrow-right"
                  text="Sign Up"
                  type="submit"
                />
              </ControlGroup>
            </form>
          )}
          <br />
          <Text>
            <Link to={routes.LOGIN}>Already have an account?</Link>
          </Text>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
