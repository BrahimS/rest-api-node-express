const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/orders");

// Handle Orders requests
router.get("/", (request, response, next) => {
	Order.find()
		.select("productId quantity")
		.then((docs) => {
			console.log(docs);
			response.status(200).json(docs);
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				error: err,
			});
		});
});
router.post("/", (request, response, next) => {
	const order = new Order({
		_id: mongoose.Types.ObjectId(),
		quatity: request.body.quatity,
		product: request.body.productId,
	});
	order
		.save()
		.then((result) => {
			console.log(result);
			response.status(201).json(result);
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({ error: err });
		});
});

router.get("/:orderId", (request, response, next) => {
	response.status(200).json({
		message: "Orders details",
		Order: order,
	});
});
router.post("/:orderId", (request, response, next) => {
	response.status(201).json({
		message: "Order was Posted",
	});
});
router.patch("/:orderId", (request, response, next) => {
	response.status(201).json({
		message: "Order was Updated",
	});
});
router.delete("/:orderId", (request, response, next) => {
	response.status(200).json({
		message: "Order was Deleted",
	});
});

module.exports = router;
