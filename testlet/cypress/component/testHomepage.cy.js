import React from "react";
import Index from "../../pages/index";

describe("<Index />", () => {
  beforeEach(() => {
    cy.mount(<Index />);
  });

  it("renders the Revolutionize Your Learning section", () => {
    cy.contains("Revolutionize Your Learning").should("be.visible");
    cy.contains(
      "Testlet is the ultimate platform for students and educators alike."
    ).should("be.visible");
    cy.get("a").contains("Get Started").should("be.visible");
  });

  it("renders the Saved Time feature", () => {
    cy.get(".feature-title").contains("Save Time").should("be.visible");
    cy.contains("With Testlet, you can easily create flash card sets").should(
      "be.visible"
    );
  });

  it("renders the Stored Remotely feature", () => {
    cy.get(".feature-title").contains("Stored Remotely").should("be.visible");
    cy.contains(
      "Testlet allows you to create and access your flash card sets"
    ).should("be.visible");
  });

  it("renders the Secure feature", () => {
    cy.get(".feature-title").contains("Secure").should("be.visible");
    cy.contains(
      "We take security seriously at Testlet, so you can be confident that your data is safe and secure."
    ).should("be.visible");
  });

  it("renders the Features section", () => {
    cy.get("h2").contains("Features").should("be.visible");
    cy.get(".mylist").should("be.visible");
    cy.get(".mylist li").should("have.length", 7);
  });
});
