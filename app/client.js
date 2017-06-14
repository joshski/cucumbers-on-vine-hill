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
