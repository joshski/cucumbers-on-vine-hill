const hyperdom = require('hyperdom')
const Client = require('./client')

hyperdom.append(document.body, new Client(''), {})
