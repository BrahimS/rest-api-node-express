const mongoose = require("mongoose");
const Order = require("../models/orders");
const Product = require("../models/products");

exports.ordersGetAll = (request, response, next) => {
	Order.find()
		.select("product quantity _id")
		.populate("product")
		.exec()
		.then((docs) => {
			console.log(docs);
			response.status(200).json({
				count: docs.length,
				orders: docs.map((doc) => {
					return {
						_id: doc._id,
						product: doc.product,
						quantity: doc.quantity,
						request: {
							type: "GET",
							url: `http://localhost:3000/orders/${doc._id}`,
						},
					};
				}),
			});
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				error: err,
			});
		});
};

exports.createOrder = (request, response, next) => {
	Product.findById(request.body.productId)
		.then((product) => {
			const order = new Order({
				_id: mongoose.Types.ObjectId(),
				quatity: request.body.quatity,
				product: request.body.productId,
			});
			return order.save();
		})
		.then((result) => {
			console.log(result);
			response.status(201).json({
				message: "Order stored",
				createdOrder: {
					_id: result._id,
					quatity: result.quatity,
					product: result.product,
					request: {
						type: "GET",
						url: `http://localhost:3000/orders/${result._id}`,
					},
				},
			});
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				message: "Product Not Found",
				error: err,
			});
		});
};

exports.getOrder = (request, response, next) => {
	Order.findById(request.params.orderId)
		.populate("product", "desc price name _id")
		.exec()
		.then((order) => {
			response.status(200).json({
				order: order,

				request: {
					type: "GET",
					url: `http://localhost:3000/orders`,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				messsage: "",
				error: err,
			});
		});
};

exports.deleteOrder = (request, response, next) => {
	Order.remove({ _id: request.params.orderId })
		.exec()
		.then((result) => {
			response.status(200).json({
				message: "Order deleted",
				request: {
					type: "POST",
					url: `http://localhost:3000/orders`,
					body: {
						productID: "ID",
						quantity: "Number",
					},
				},
			});
		})
		.catch((err) => {
			response.status(500).json({
				error: err,
			});
		});
};
