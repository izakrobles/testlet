import React from "react";
import About from "./about";

describe("<About />", () => {
  it("renders", () => {
    cy.mount(<About />);
  });
});
