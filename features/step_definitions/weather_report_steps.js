const { defineSupportCode } = require('cucumber')
const hyperdom = require('hyperdom')
const VineHill = require('vinehill')
const browserMonkey = require('browser-monkey')
const Client = require('../../app/client')
const server = require('../../app/server')

defineSupportCode(function ({ Before, When, Then }) {
  Before(function() {
    new VineHill().start('http://weather.com', server)
    hyperdom.append(document.body, new Client('http://weather.com'), {})
    this.browser = browserMonkey.component('body')
  })

  When('I ask about the weather in London', function () {
    return this.browser.find('.london').click()
  })

  Then('it should be rainy again', function () {
    return this.browser.find('.outlook', { text: 'Rainy!' }).shouldExist()
  })
})
