## Cucumbers on Vine Hill

Everyone's invited to my party:

* [cucumber-electron](https://github.com/cucumber/cucumber-electron) runs scenarios in a browser that's also a node.js
* [hyperdom](https://github.com/featurist/hyperdom) renders dynamic HTML
* [httpism](https://github.com/featurist/httpism) talks to the server
* [express](https://github.com/expressjs/express) powers the back end web API
* [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages and asserts
* [vinehill](https://github.com/featurist/vinehill) cuts out HTTP to keep tests fast and repeatable

Here's how they mingle:

#### [Features](features/weather_forecast.feature)

```gherkin
Feature: Weather Forecast

  Scenario: Forecast for a city
    Given I am using the weather app
    When I open the forecast for London
    Then it should predict rain again
```

#### [Step Definitions](features/step_definitions/steps.js)

```js
const cucumber = require('cucumber')
const hyperdom = require('hyperdom')
const vineHill = require('vinehill')
const browserMonkey = require('browser-monkey')
const Client = require('../../app/client')
const server = require('../../app/server')

const weatherUrl = 'http://weather.com'

cucumber.defineSupportCode(function ({ Given, When, Then }) {
  Given('I am using the weather app', function () {
    vineHill({ [weatherUrl]: server })
    hyperdom.append(document.body, new Client(weatherUrl))
    this.monkey = browserMonkey.component(document.body)
  })

  When('I open the forecast for London', function () {
    return this.monkey.click('Forecast for London')
  })

  Then('it should predict rain again', function () {
    return this.monkey.shouldFind('h1', { text: 'Rainy!' })
  })
})
```

#### [Client](app/client.js)

```js
const hyperdom = require('hyperdom')
const httpism = require('httpism/browser')
const html = hyperdom.html

module.exports = class WeatherAppClient {
  constructor(serverUrl) {
    this.api = httpism.client(serverUrl)
  }

  render() {
    return this.forecast ? this.renderForecast() : this.renderMenu()
  }

  renderMenu(model) {
    return html('button', { onclick: () => this.fetchForecast('london') },
      'Forecast for London')
  }

  fetchForecast(city) {
    return this.api.get('/cities/' + city)
      .then(weather => { this.forecast = weather.forecast })
  }

  renderForecast() {
    return html('h1', this.forecast)
  }
}
```

#### [Server](app/server.js)

```js
const path = require('path')
const express = require('express')
const app = express()

app.get('/cities/:city', (req, res) => {
  res.json({ forecast: 'Rainy!' })
})

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
```

## Testing and developing

Install it:

    npm install

Then you can run cucumber-electron with:

    ./cucumber

Or debug it in a browser window:

    ./cucumber --electron-debug

Hit cmd+r to re-run scenarios

## Running the app in a browser

Run the server:

    npm start

And point your browser at:

    http://localhost:3001
