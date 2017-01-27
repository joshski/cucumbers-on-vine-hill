const path = require('path')
const express = require('express')
const app = express()

app.get('/cities/:city', (req, res) => {
  res.json({ outlook: 'Rainy!' })
})

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app
