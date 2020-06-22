const express = require("express");
const app = express();

// Middelware to handle logs
const morgan = require("morgan");
app.use(morgan("dev"));
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// Link the differents routes to the application
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Handle error

app.use((request, response, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, request, response, next) => {
	response.status(error.status || 500);
	response.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
