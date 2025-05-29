import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.visit("/");
});

When("I enter a valid username and password", () => {
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
});

When("I enter an invalid username and password", () => {
  cy.get('[data-test="username"]').type("invalid_user");
  cy.get('[data-test="password"]').type("invalid_pass");
});

And("I click the login button", () => {
  cy.get('[data-test="login-button"]').click();
});

Then("I should be redirected to the inventory page", () => {
  cy.url().should("include", "/inventory.html");
});

Then("I should see an error message", () => {
  cy.get('[data-test="error"]').should("contain.text", "Epic sadface");
});
