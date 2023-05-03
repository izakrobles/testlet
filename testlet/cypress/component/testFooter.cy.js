import React from "react";
import Footer from "../../pages/components/Footer";

describe("<Footer />", () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it("renders the footer text", () => {
    cy.contains("Testlet. All rights reserved.").should("be.visible");
  });
});
