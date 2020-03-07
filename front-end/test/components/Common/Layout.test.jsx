import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Layout from "../../../src/components/Common/Layout";
import TestComponent from "./TestComponent";

const params = {
  route: {
    location: {
      pathname: "/calendar"
    }
  }
};

describe("Layout", () => {
  test("should render layout", () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <Layout route={params.route} page={TestComponent} />
        </MemoryRouter>
      )
      .toJSON();

    var navGroup = component.children[0].children[0].children[0].children[0];
    expect(navGroup.children[0].type).toBe("a");
    expect(navGroup.children[0].props.href).toBe("/profile");
    expect(navGroup.children[1].props.className).toBe("bp3-navbar-divider");
    expect(navGroup.children[2].type).toBe("a");
    expect(navGroup.children[2].props.href).toBe("/calendar");
    expect(navGroup.children[3].props.className).toBe("bp3-navbar-divider");
    expect(navGroup.children[4].type).toBe("a");
    expect(navGroup.children[4].props.href).toBe("/search");
    expect(navGroup.children[5].props.className).toBe("bp3-navbar-divider");
    expect(navGroup.children[6].type).toBe("a");
    expect(navGroup.children[6].props.href).toBe("/manageOrgs");

    expect(component).toMatchSnapshot();
  });
});
