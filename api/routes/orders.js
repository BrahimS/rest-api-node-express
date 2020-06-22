const express = require("express");
const router = express.Router();

// Handle Orders requests
router.get("/", (request, response, next) => {
	response.status(200).json({
		message: "Orders were Fetched",
	});
});
router.post("/", (request, response, next) => {
	const order = {
		productID: request.body.productID,
		quantity: request.body.quantity,
	};
	response.status(201).json({
		message: "Orders were Posted",
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