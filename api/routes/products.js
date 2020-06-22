const express = require("express");
const router = express.Router();

// Handle Products requests
router.get("/", (request, response, next) => {
	response.status(200).json({
		masssage: "Get data into the products page",
	});
});
router.post("/", (request, response, next) => {
	response.status(201).json({
		masssage: "Post data into the products page",
	});
});
router.get("/:productId", (request, response, next) => {
	const id = request.params.productId;

	if (id === "ok") {
		response.status(200).json({
			masssage: "You guess the right id",
		});
	} else {
		response.status(200).json({
			masssage: "You passed a new id",
		});
	}
});
router.patch("/:productId", (request, response, next) => {
	response.status(201).json({
		message: "You Updated the product",
	});
});
router.delete("/:productId", (request, response, next) => {
	response.status(200).json({
		message: "You Deleted the product",
	});
});

module.exports = router;
