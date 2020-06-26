const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkAuth = require("../middleware/check-auth.js");
const User = require("../models/user");
exports.userSignUp = (request, response, next) => {
	User.find({ email: request.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return response.status(409).json({
					message: "email already exist !",
				});
			} else {
				bcrypt.hash(request.body.password, 10, (err, hash) => {
					if (err) {
						return response.status(500).json({
							err: err,
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: request.body.email,
							password: hash,
						});
						user
							.save()
							.then((result) => {
								console.log(result);
								response.status(201).json({
									message: "User created",
								});
							})
							.catch((err) => {
								console.log(err);
								response.status(500).json({
									error: err,
								});
							});
					}
				});
			}
		});
};

exports.userLogin = (request, response, next) => {
	User.find({ email: request.body.email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				response.status(401).json({
					message: "Auth failed!",
				});
			}
			bcrypt.compare(request.body.password, user[0].password, (err, result) => {
				if (err) {
					return response.status(401).json({
						message: "Auth failed!",
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							userId: user[0]._id,
						},
						process.env.JWT_PASS,
						{
							expiresIn: "1h",
						}
					);
					return response.status(200).json({
						message: "Auth successful!",
						token,
					});
				}
				response.status(401).json({
					message: "Auth failed!",
				});
			});
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				error: err,
			});
		});
};

exports.deleteUser = (request, response, next) => {
	User.remove({ _id: request.params.userId })
		.exec()
		.then((result) => {
			response.status(200).json({
				message: "User deleted",
			});
		})
		.catch((err) => {
			console.log(err);
			response.status(500).json({
				error: err,
			});
		});
};
