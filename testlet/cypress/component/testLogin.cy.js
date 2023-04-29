import React from "react";
import Login from "../../pages/login";
import Index from "../../pages/index";

describe("<Login Page />", () => {
  it("renders", () => {
    cy.mount(<Login />);
    // Check if the elements are rendered correctly
    cy.contains("Login").should("be.visible");
    cy.get("input[type='email']").should("be.visible");
    cy.get("input[type='password']").should("be.visible");
    cy.get("button").contains("Login").should("be.visible");
    cy.get(".google").should("be.visible");
  });
});
