const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = require("../controllers/user.js");

router.post("/signup", userController.userSignUp);

router.post("/login", userController.userLogin);

router.delete("/:userId", userController.deleteUser);
module.exports = router;
