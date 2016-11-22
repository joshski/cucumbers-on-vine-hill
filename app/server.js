const express = require('express')
const app = express()

app.get('/weather/:city', (req, res) => {
  res.json({ outlook: 'Rainy!' })
})

module.exports = app
