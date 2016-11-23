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
