/// <reference types="cypress" />

describe('Administrator', () => {
  it('<Login /> - authentication', () => {
    cy.visit('/');

    cy.get("[data-cy=email-input]").type("Ale3@correo.com");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=new-project]").click();

    cy.get("[data-cy=submit-new-project]").click();

    cy.get("[data-cy=alert]")
      .should("exist")
      .invoke("text")
      .should("equal", "All fields are required");
    
    cy.get("[data-cy=input-project-name]").type("Project Test");
    cy.get("[data-cy=input-project-description]").type("Description test");
    cy.get("[data-cy=input-project-deadline]").type("2024-12-31");
    cy.get("[data-cy=input-project-client]").type("client test");

    cy.get("[data-cy=submit-new-project]").click();

    cy.get("[data-cy=project]:first").click();

    cy.get("[data-cy=new-task]").click();

  })
  
})