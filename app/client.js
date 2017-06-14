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
    return html('button', {
      onclick: () => this.api.get('/cities/london')
        .then(weather => { this.forecast = weather.forecast })
      },
    'Forecast for London')
  }

  renderForecast() {
    return html('h1', this.forecast)
  }
}
