// Import the `noUser` component
import NoUser from "../../pages/noUser";
import React from "react";

describe('No User Page', () => {
  beforeEach(() => {
    // Load the page before each test
    cy.mount(<NoUser />);
  });

  it('displays user information', () => {
    // Check if the user information is displayed correctly
    cy.contains('h2', 'JDough1');
    cy.contains('p', 'Jog Dough');
    cy.contains('p', 'Jog Dough Email');
    cy.contains('p', 'Account Created: Day-Month-Year');
  });

  it('logs out the user', () => {
    // Click on the logout button and check if the user is redirected to the home page
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/');
  });
});
