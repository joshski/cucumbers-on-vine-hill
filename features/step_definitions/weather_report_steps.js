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
