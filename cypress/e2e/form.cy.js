/// <reference types="cypress" />

describe('<Form />', () => {
  it('<Login /> - sign in', () => {

    // text
    cy.visit("/");

    cy.get("[data-cy=title]")
      .invoke("text")
      .should("equal", "Manage your Projects");
    
    // form
    cy.get("[data-cy=form-login]")
      .should("exist");
    
    // inputs
    cy.get("[data-cy=email-input]")
      .should("exist");
    cy.get("[data-cy=password-input]")
      .should("exist");
    cy.get("[data-cy=submit-login]")
      .should("exist")
      .should("have.value", "Sign In");
    
    // link
    cy.get("[data-cy=new-account]")
      .should("have.attr", "href")
      .should("eq", "/register")
      .should("exist");
    cy.visit("/register");
    
  });

  it("<Register /> - create new account", () => {
    cy.visit("/register");

    cy.get("[data-cy=title]")
      .should("exist")
      .invoke("text")
      .should("equal", "Create your Account and start to manage your Projects");
    
    cy.get("[data-cy=new-account]")
      .should("exist");
    
    cy.get("[data-cy=name-input]").should("exist");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "password"); 
    cy.get("[data-cy=repeat-password-input]").should("exist");

    cy.get("[data-cy=submit-new-account]")
      .should("exist")
      .should("have.class", "bg-sky-700")
      .should("have.value", "Join Now");
    
    cy.get("[data-cy=link-login]")
      .should("exist")
      .should("have.attr", "href")
      .should("eq", "/");
    
    cy.visit("/login");

  });

})