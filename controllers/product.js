'use strict'

const Product = require('../models/product') // Includes the model

function getProduct(req, res) {
	let productID = req.params.productId

	Product.findById(productID, (err, product) => {
		if (err) res.status(500).send({ message: `Error while making the petition: ${err}` })
		if (!product) return res.status(404).send({ message: `The product does not exist` })

		res.status(200).send({ product })
	})
}

function getProducts(req, res) {
	Product.find({}, (err, products) => {
		if (err) res.status(500).send({ message: `Error while making the petition: ${err}` })
		if (!products) return res.status(404).send({ message: `The product's list does not exist` })

		res.send(200, { products })
	})
}

function saveProduct(req, res) {
	console.log('POST /api/product')
	res.status(200).send(req.body) // console.log(req.body)

	// Save data into the database
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
}
function updateProduct(req, res) {
	let productID = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productID, update, (err, productUpdated) => {
		if (err) res.status(500).send({ message: `An error has had produced while updating the product: ${err}` })

		res.status(200).send({ product: productUpdated })
	})
}

function deleteProduct(req, res) {
	let productID = req.params.productId

	Product.findById(productID, (err, product) => {
		if (err) res.status(500).send({ message: `An error has had produced while deleting the product: ${err}` })

		product.remove(err => {
			if (err) res.status(500).send({ message: `An error has had produced while deleting the product: ${err}` })
			res.status(200).send({ message: 'The product has been deleted' })
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}
