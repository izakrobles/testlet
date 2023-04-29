import React from "react";
import About from "./../../pages/about";

describe("<About />", () => {
  it("renders", () => {
    cy.mount(<About />);
  });
});
