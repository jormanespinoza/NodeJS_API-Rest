'use strict'

// Adding libraries
const express = require('express') // Framework
const bodyParser = require('body-parser') // Middleware
const app =  express() // Creates the app
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false })) // Adding bodyParser
app.use(bodyParser.json()) // Allow the use of JSON in the messages format
app.use('/api', api)

module.exports = app
