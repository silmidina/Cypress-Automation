Feature: Shopping Cart

  Scenario: Add item to cart
    Given I am logged in with valid credentials
    When I add an item to the cart
    And I go to the cart page
    Then I should see the item in the cart

  Scenario: View empty cart
    Given I am logged in with valid credentials
    When I go to the cart page without adding items
    Then I should see an empty cart