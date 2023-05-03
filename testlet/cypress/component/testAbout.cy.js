import React from "react";
import About from "../../pages/about";

describe("<About />", () => {
  beforeEach(() => {
    cy.mount(<About />);
  });

  it("renders the About page", () => {
    cy.contains("About Testlet").should("be.visible");
  });

  it("displays the team photo", () => {
    cy.get("img").should("have.attr", "src", "group.png");
  });

  it("displays the team description", () => {
    cy.get(".our-team").should("be.visible");
  });
});
