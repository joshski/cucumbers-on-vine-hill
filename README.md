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

#### [Step Definitions](features/step_definitions/weather_report_steps.js)

```js
const hyperdom = require('hyperdom')
const vinehill = new (require('vinehill'))()
const browserMonkey = require('browser-monkey')
const client = require('../../app/client')
const server = require('../../app/server')

module.exports = function() {
  this.Before(function() {
    vinehill.add('http://weather.com', server)
    vinehill.start()
    hyperdom.append(document.body, client, {})
    this.browser = browserMonkey.component('body')
  })

  this.When(/^I ask about the weather in London$/, function () {
    return this.browser.find('.london').click()
  })

  this.Then(/^it should be rainy again$/, function () {
    return this.browser.find('.outlook', { text: 'Rainy!' }).shouldExist()
  })
}
```

#### [Client](app/client.js)

```js
const hyperdom = require('hyperdom')
const httpism = require('httpism/browser')

const html = hyperdom.html
const api = httpism.api('http://weather.com/')

module.exports = function weatherApp(model) {
  return model.outlook ? renderOutlook(model) : renderButton(model)
}

function renderOutlook(model) {
  return html('h1.outlook', model.outlook)
}

function renderButton(model) {
  return html('button.london', {
    onclick: () => api.get('/weather/london')
      .then(res => { model.outlook = res.body.outlook })
    },
  'Weather In London')
}
```

#### [Server](app/server.js)

```js
const express = require('express')
const app = express()

app.get('/weather/:city', (req, res) => {
  res.json({ outlook: 'Rainy!' })
})

module.exports = app
```
