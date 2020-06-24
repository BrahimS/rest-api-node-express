const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Middelware to handle logs
const morgan = require('morgan')
app.use(morgan('dev'))

// Connect the database
mongoose.connect(
	`mongodb+srv://bs:${process.env
		.MONGO_PASS}@rest-api-bs-isfee.mongodb.net/rest-api-bs?retryWrites=true&w=majority`,
	{
		// useMongoClient: true,
		useNewUrlParser    : true,
		useUnifiedTopology : true
	}
)
mongoose.Promise = global.Promise

// parse body data in json format
app.use(express.urlencoded())
app.use(express.json())

// Handle CORS Access
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Headers', '*')
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	if (request.method === 'OPTIONS') {
		response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE')
		return response.status(200).json({})
	}
	next()
})

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// Link the differents routes to the application
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// Handle error
app.use((request, response, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})

app.use((error, request, response, next) => {
	response.status(error.status || 500)
	response.json({
		error : {
			message : error.message
		}
	})
})

module.exports = app
