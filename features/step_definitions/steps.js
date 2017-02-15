const cucumber = require('cucumber')
const hyperdom = require('hyperdom')
const VineHill = require('vinehill')
const browserMonkey = require('browser-monkey')
const Client = require('../../app/client')
const server = require('../../app/server')

const weatherUrl = 'http://weather.com'

cucumber.defineSupportCode(function ({ Given, When, Then }) {
  Given('I am using the weather app', function () {
    new VineHill().start(weatherUrl, server)
    hyperdom.append(document.body, new Client(weatherUrl))
    this.monkey = browserMonkey.component(document.body)
  })

  When('I open the forecast for London', function () {
    return this.monkey.click('Forecast for London')
  })

  Then('it should be rainy again', function () {
    return this.monkey.find('h1', { text: 'Rainy!' }).shouldExist()
  })
})
