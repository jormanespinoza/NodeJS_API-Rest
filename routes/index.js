'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product') // Adding Controller
const auth = require('../middlewares/auth')
const api = express.Router()

// Routes
api.get('/product', ProductCtrl.getProducts)
api.get('/product/:productId', ProductCtrl.getProduct)
api.post('/product', ProductCtrl.saveProduct)
api.put('/product/:productId', ProductCtrl.updateProduct)
api.delete('/product/:productId', ProductCtrl.deleteProduct)
/*
api.get('/private', auth.isAuth, function(req, res) {
	res.status(200).send({ message: 'You have access' })
})
*/
module.exports = api
