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
    return html('h1.outlook', this.outlook)
  }

  renderButton(model) {
    return html('button', {
      onclick: () => this.api.get('/cities/london')
        .then(res => { this.outlook = res.body.outlook })
      },
    'Weather In London')
  }
}
