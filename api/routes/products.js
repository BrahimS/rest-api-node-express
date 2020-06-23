const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/products");

// Handle Products requests
router.get("/", (request, response, next) => {
	Product.find()
		.exec()
		.then((doc) => {
			console.log(doc.length);
			response.status(200).json(doc);
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				error: err,
			});
		});
});

router.post("/", (request, response, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: request.body.name,
		price: request.body.price,
		desc: request.body.desc,
	});
	product
		.save()
		.then((result) => {
			console.log(result);
			response.status(201).json({
				masssage: "Post data into the products page",
				createdProduct: result,
			});
		})
		.catch((err) => {
			console.log(error);
			response.status(500).json({ error: err });
		});
});
router.get("/:productId", (request, response, next) => {
	const id = request.params.productId;
	Product.findById(id)
		.exec()
		.then((doc) => {
			console.log(doc);
			response.status(200).json(doc);
		})
		.catch((err) => {
			response.status(500).json({ error: err });
		});
});
router.patch("/:productId", (request, response, next) => {
	const optionsToUpdate = {};
	for (const opt of request.body) {
		optionsToUpdate[opt.propName] = opt.value;
	}
	const id = request.params.productId;
	Product.update(
		{ _id: id },
		{
			$set: optionsToUpdate,
		}
	)
		.exec()
		.then((result) => {
			console.log(result);
			response.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				error: err,
			});
		});
});
router.delete("/:productId", (request, response, next) => {
	const id = request.params.productId;
	Product.remove({ _id: id })
		.exec()
		.then((result) => {
			console.log(result);
			response.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({ error: err });
		});
});

module.exports = router;
