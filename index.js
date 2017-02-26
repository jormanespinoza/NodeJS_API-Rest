'use strict'

const mongoose = require('mongoose') // Allows data base changes
const app = require('./app') // Calls the app
const config = require('./config')

// Connecting to the DB
mongoose.connect(config.db, (err, res) => {
	if (err) {
		console.log(`Error while connecting to the data base: ${err}`)
	}
	console.log('Connecting to the established data base...')

	// Start server on port 3000
	app.listen(config.port, () => { // () => It's the same as function () {}
		console.log(`API REST running into http://localhost:${config.port}`) // Use invert accents
	})
})
