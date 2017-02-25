'use strict'

// Adding libraries
const express = require('express') // Framework
const bodyParser = require('body-parser') // Middleware
const mongoose = require('mongoose')

const app =  express() // Creates the app
const port = process.env.PORT || 3000 // Asignes the port number


// Adding bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // Allow the use of JSON in the messages format

/*
// Generate a route in the browser
app.get('/hello/:name', (req, res) => {
	res.send({ message: `Hello ${req.params.name}` })	
})
*/

// Routes
app.get('/api/product', (req, res) => {
	res.send(200, { products: [] })
})

app.get('/api/product/:productId', (req, res) => {
	
})

app.post('/api/product', (req, res) => {
	console.log(req.body)
	res.status(200).send({ message: 'The product has been received' })
})

app.put('/api/product/:productId', (req, res) => {
	
})

app.delete('/api/product', (req, res) => {
	
})

// Connecting to the DB
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if (err) {
		console.log(`Error while connecting to the data base: ${err}`)
	}else {
		console.log('Connecting to the established data base...')
	}

	// Start server on port 3000
	app.listen(port, () => { // () => It's the same as function () {}
		console.log(`API REST running into http://localhost:${port}`) // Use invert accents

	})
})
