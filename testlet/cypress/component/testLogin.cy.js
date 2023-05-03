import React from "react";
import Login from "../../pages/login";

describe("<Login />", () => {
  beforeEach(() => {
    cy.mount(<Login />);
  });

  it("renders the Login page", () => {
    cy.contains("Login").should("be.visible");
  });

  it("renders the email input field", () => {
    cy.get("input[type='email']").should("be.visible");
  });

  it("renders the password input field", () => {
    cy.get("input[type='password']").should("be.visible");
  });

  it("renders the Login button", () => {
    cy.get("button").contains("Login").should("be.visible");
  });

  it("renders the Google Login button", () => {
    cy.get(".google").should("be.visible");
  });
});
