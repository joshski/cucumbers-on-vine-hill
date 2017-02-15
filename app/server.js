const path = require('path')
const express = require('express')
const app = express()

app.get('/cities/:city', (req, res) => {
  res.json({ forecast: 'Rainy!' })
})

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
