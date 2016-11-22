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
