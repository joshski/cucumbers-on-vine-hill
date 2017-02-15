  Feature: Weather Forecast

    Scenario: Forecast for a city
      Given I am using the weather app
      When I open the forecast for London
      Then it should predict rain again
