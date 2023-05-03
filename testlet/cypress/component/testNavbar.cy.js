import React from "react";
import Navbar from "../../pages/components/Navbar";

describe("<Navbar />", () => {
  beforeEach(() => {
    cy.mount(<Navbar />);
  });

  it("renders the logo", () => {
    cy.get(".logo").should("be.visible");
  });

  it("renders the Home link", () => {
    cy.contains("Home").should("be.visible");
  });

  it("renders the Search input field", () => {
    cy.get(".box").should("be.visible");
  });

  it("renders the About link", () => {
    cy.contains("About").should("be.visible");
  });

  it("renders the Login link when user is not logged in", () => {
    cy.contains("Login").should("be.visible");
  });
});
