var hyperdom = require('hyperdom')
var httpism = require('httpism/browser')
var vinehill = new (require('vinehill'))()
var browserMonkey = require('browser-monkey')

var assert = require('assert')
var express = require('express')

function weatherApp(model) {
  function forecast() {
    return httpism.get('http://weather.com/weather/london')
      .then(response => { model.outlook = response.body.outlook })
  }
  var h = hyperdom.html
  return model.outlook ?
    h('h1.outlook', model.outlook)
    :
    h('a.london', { onclick: forecast }, 'Weather In London')
}

module.exports = function() {
  this.Before(function() {
    var app = express()

    app.get('/weather/:city', (req, res) => {
      res.json({ outlook: 'Rainy!' })
    })

    vinehill.add('http://weather.com', app)
    vinehill.start()

    hyperdom.append(document.body, weatherApp, {})

    this.browser = browserMonkey.component('body')
  })

  this.When(/^I ask about the weather in London$/, function () {
    return this.browser.find('.london').click()
  })

  this.Then(/^it should be rainy again$/, function () {
    return this.browser.find('.outlook', { text: 'Rainy!' }).shouldExist()
  })
}
