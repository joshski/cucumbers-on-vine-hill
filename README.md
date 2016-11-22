## Cucumbers on Vine Hill

[Everyone's invited](features/step_definitions/weather_report_steps.js) to my party:

* [cucumber-electron](https://github.com/featurist/cucumber-electron) runs scenarios in a browser that's also a node.js
* [hyperdom](https://github.com/featurist/hyperdom) renders dynamic HTML
* [httpism](https://github.com/featurist/httpism) talks to the server
* [express](https://github.com/expressjs/express) powers the back end web API
* [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages and asserts
* [vinehill](https://github.com/dereke/vinehill) cuts out HTTP to keep tests fast and repeatable

Check out the [client](app/client.js), [server](app/server.js), and [step definitions](features/step_definitions/weather_report_steps.js)

#### Client

```js
const hyperdom = require('hyperdom')
const httpism = require('httpism/browser')

module.exports = function weatherApp(model) {
  function forecast() {
    return httpism.get('http://weather.com/weather/london')
      .then(response => { model.outlook = response.body.outlook })
  }
  const h = hyperdom.html
  return model.outlook ?
    h('h1.outlook', model.outlook)
    :
    h('a.london', { onclick: forecast }, 'Weather In London')
}
```

#### Server

```js
const express = require('express')
const app = express()

app.get('/weather/:city', (req, res) => {
  res.json({ outlook: 'Rainy!' })
})

module.exports = app
```

#### Step Definitions

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
