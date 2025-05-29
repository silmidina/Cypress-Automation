Feature: Checkout Process

  Scenario: Complete checkout process
    Given I have an item in my cart
    When I proceed to checkout
    And I fill in my personal information
    And I continue to the overview page
    And I finish the checkout
    Then I should see the order confirmation message

  Scenario: Checkout without filling required fields
    Given I have an item in my cart
    When I proceed to checkout
    And I leave personal information empty
    Then I should see an error on the checkout form