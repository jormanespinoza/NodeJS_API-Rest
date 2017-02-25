'use strict'

// Adding libraries
const express = require('express') // Framework
const bodyParser = require('body-parser') // Middleware
const mongoose = require('mongoose') // Allows data base changes

// Includes the model
const Product = require('./models/product')

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
	Product.find({}, (err, products) => {
		if (err) res.status(500).send({ message: `Error while making the petition: ${err}` })
		if (!products) return res.status(404).send({ message: `The product's list does not exist` })

		res.send(200, { products })
	})
})

app.get('/api/product/:productId', (req, res) => {
	let productID = req.params.productId
	
	Product.findById(productID, (err, product) => {
		if (err) res.status(500).send({ message: `Error while making the petition: ${err}` })
		if (!product) return res.status(404).send({ message: `The product does not exist` })

		res.status(200).send({ product })
	})
})

app.post('/api/product', (req, res) => {
	/*
	console.log(req.body)
	res.status(200).send({ message: 'The product has been received' })
	*/
	console.log('POST /api/product')
	console.log(req.body)

	// Save into he database
	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, productStored) => {
		if (err) res.status(500).send({ message: `An error has had produced while saving the product: ${err}` })

		res.status(200).send({ product: productStored })
	})
})

app.put('/api/product/:productId', (req, res) => {
	let productID = req.params.productId
	let update = req.body
	
	Product.findByIdAndUpdate(productID, update, (err, productUpdated) => {
		if (err) res.status(500).send({ message: `An error has had produced while updating the product: ${err}` })

		res.status(200).send({ product: productUpdated })
	})
})

app.delete('/api/product/:productId', (req, res) => {
	let productID = req.params.productId
	
	Product.findById(productID, (err, product) => {
		if (err) res.status(500).send({ message: `An error has had produced while deleting the product: ${err}` })

		product.remove(err => {
			if (err) res.status(500).send({ message: `An error has had produced while deleting the product: ${err}` })
			res.status(200).send({ message: 'The product has been deleted' })
		})

	})
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
