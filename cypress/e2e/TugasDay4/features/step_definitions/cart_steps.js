import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in with valid credentials", () => {
  cy.visit("https://www.saucedemo.com/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
  cy.url().should("include", "/inventory.html");
});

When("I add an item to the cart", () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

When("I go to the cart page without adding items", () => {
  cy.get(".shopping_cart_link").click();
});

And("I go to the cart page", () => {
  cy.get(".shopping_cart_link").click();
});

Then("I should see the item in the cart", () => {
  cy.get(".cart_item").should("have.length.at.least", 1);
});

Then("I should see an empty cart", () => {
  cy.get(".cart_item").should("not.exist");
});