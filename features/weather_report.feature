  Feature: Weather Report

    Scenario: The weather in my city
      When I ask about the weather in London
      Then it should be rainy again
