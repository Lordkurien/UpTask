/// <reference types="cypress" />

describe('<Register /> ', () => {
  it('<Register /> - Validation and Alerts', () => {
    cy.visit('/register');

    cy.get("[data-cy=submit-new-account]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "All fields are required");
    
    cy.get("[data-cy=alert]").should("have.class", "from-red-400 to-red-600");

    // form

    cy.get("[data-cy=name-input]").type("Ale3");
    cy.get("[data-cy=email-input]").type("Ale3@correo.com");
    cy.get("[data-cy=password-input]").type("123");
    cy.get("[data-cy=repeat-password-input]").type("123");

    cy.get("[data-cy=submit-new-account]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "Password must be at least 6 characters long");

    cy.get("[data-cy=alert]").should("have.class", "from-red-400 to-red-600");

    cy.get("[data-cy=password-input]").clear().type("123456");
    cy.get("[data-cy=repeat-password-input]").clear().type("12345");
    
    cy.get("[data-cy=submit-new-account]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "Passwords are different");
    
    cy.get("[data-cy=repeat-password-input]").clear().type("123456");

    cy.get("[data-cy=submit-new-account]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "The user has been created. Please, confirm your account");
    
    cy.get("[data-cy=alert]").should("have.class", "from-sky-400 to-sky-600");

    cy.get("[data-cy=name-input]").type("Ale3");
    cy.get("[data-cy=email-input]").type("Ale3@correo.com");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=repeat-password-input]").type("123456");
    
    cy.get("[data-cy=submit-new-account]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "User Register");
    
    cy.get("[data-cy=alert]").should("have.class", "from-red-400 to-red-600");
  })
})