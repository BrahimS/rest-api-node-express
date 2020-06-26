const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");

const orderController = require("../controllers/orders");

// Handle Orders requests
router.get("/", checkAuth, orderController.ordersGetAll);
router.post("/", checkAuth, orderController.createOrder);

router.get("/:orderId", checkAuth, orderController.getOrder);
router.post("/:orderId", checkAuth, (request, response, next) => {
	response.status(201).json({
		message: "Order was Posted",
	});
});
router.patch("/:orderId", checkAuth, (request, response, next) => {
	response.status(201).json({
		message: "Order was Updated",
	});
});
router.delete("/:orderId", checkAuth, orderController.deleteOrder);

module.exports = router;
