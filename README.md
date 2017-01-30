## Cucumbers on Vine Hill

Everyone's invited to my party:

* [cucumber-electron](https://github.com/featurist/cucumber-electron) runs scenarios in a browser that's also a node.js
* [hyperdom](https://github.com/featurist/hyperdom) renders dynamic HTML
* [httpism](https://github.com/featurist/httpism) talks to the server
* [express](https://github.com/expressjs/express) powers the back end web API
* [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages and asserts
* [vinehill](https://github.com/dereke/vinehill) cuts out HTTP to keep tests fast and repeatable

Here's how they mingle:

#### [Features](features/weather_report.feature)

```gherkin
Feature: Weather Report

  Scenario: The weather in my city
    When I ask about the weather in London
    Then it should be rainy again
```

#### [Step Definitions](features/step_definitions/steps.js)

```js
const cucumber = require('cucumber')
const hyperdom = require('hyperdom')
const VineHill = require('vinehill')
const browserMonkey = require('browser-monkey')
const Client = require('../../app/client')
const server = require('../../app/server')

const weatherUrl = 'http://weather.com'

cucumber.defineSupportCode(function ({ Before, When, Then }) {
  Before(function () {
    new VineHill().start(weatherUrl, server)
    hyperdom.append(document.body, new Client(weatherUrl))
    this.monkey = browserMonkey.component(document.body)
  })

  When('I ask about the weather in London', function () {
    return this.monkey.click('Weather In London')
  })

  Then('it should be rainy again', function () {
    return this.monkey.find('h1', { text: 'Rainy!' }).shouldExist()
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
    this.api = httpism.api(serverUrl)
  }

  render() {
    return this.outlook ? this.renderOutlook() : this.renderButton()
  }

  renderOutlook() {
    return html('h1', this.outlook)
  }

  renderButton(model) {
    return html('button', {
      onclick: () => this.api.get('/cities/london')
        .then(res => { this.outlook = res.body.outlook })
      },
    'Weather In London')
  }
}
```

#### [Server](app/server.js)

```js
const path = require('path')
const express = require('express')
const app = express()

app.get('/cities/:city', (req, res) => {
  res.json({ outlook: 'Rainy!' })
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

Hit cmd+r to re-run tests

Hit cmd+option+i for chromium dev tools

## Running the app in a browser

Run the server:

    npm start

And point your browser at:

    http://localhost:3001
