Feature: Login functionality

  Scenario: Successful login
    Given I open the login page
    When I enter a valid username and password
    And I click the login button
    Then I should be redirected to the inventory page

  Scenario: Unsuccessful login with invalid credentials
    Given I open the login page
    When I enter an invalid username and password
    And I click the login button
    Then I should see an error message
