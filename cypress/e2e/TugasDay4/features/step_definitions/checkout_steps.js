import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("I have an item in my cart", () => {
  cy.visit("https://www.saucedemo.com/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get(".shopping_cart_link").click();
});

When("I proceed to checkout", () => {
  cy.get('[data-test="checkout"]').click();
});

And("I fill in my personal information", () => {
  cy.get('[data-test="firstName"]').type("Silmi");
  cy.get('[data-test="lastName"]').type("Rahmadina");
  cy.get('[data-test="postalCode"]').type("12345");
});

And("I leave personal information empty", () => {
  cy.get('[data-test="firstName"]').clear();
  cy.get('[data-test="lastName"]').clear();
  cy.get('[data-test="postalCode"]').clear();
  cy.get('[data-test="continue"]').click();
});

And("I continue to the overview page", () => {
  cy.get('[data-test="continue"]').click();
});

And("I finish the checkout", () => {
  cy.get('[data-test="finish"]').click();
});

Then("I should see the order confirmation message", () => {
  cy.get(".complete-header").should("contain.text", "Thank you for your order");
});

Then("I should see an error on the checkout form", () => {
  cy.get(".error-message-container").should("be.visible");
});