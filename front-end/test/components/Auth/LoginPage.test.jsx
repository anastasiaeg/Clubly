import React from "react";

import LoginPage from "../../../src/components/Auth/LoginPage";
// test file
import { shallow } from "enzyme";

describe("Login Page", () => {
  test("should render", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ loggedIn: true });
    const form = wrapper.find("form").at(0);
  });
});
