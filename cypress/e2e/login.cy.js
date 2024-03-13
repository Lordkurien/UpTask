/// <reference types="cypress" />

describe('<Login />', () => {
  it('<Login /> - Validations and Alerts', () => {
    cy.visit('/');

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "All fields are required");
    
    cy.get("[data-cy=alert]").should("have.class", "from-red-400 to-red-600");

    // user not exist

    cy.get("[data-cy=email-input]").type("user@teste.com");
    cy.get("[data-cy=password-input]").type("123456");
    
    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "User does not exist");
    
    cy.get("[data-cy=alert]").should("have.class", "from-red-400 to-red-600");

    // misspelled password

    cy.get("[data-cy=email-input]").clear().type("Ale3@correo.com");
    cy.get("[data-cy=password-input]").clear().type("123");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "Password incorrect");
    
    cy.get("[data-cy=alert]").should("have.class", "from-red-400 to-red-600");

  })
})