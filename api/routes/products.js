const express = require("express");

const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth.js");
const productsController = require("../controllers/products");

const storage = multer.diskStorage({
	destination: function (request, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (request, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const fileFilter = (request, file, cb) => {
	file.mimetype === "images/jpeg" || file.mimetype === "image/png"
		? cb(null, true)
		: cb(null, false);
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

// Handle Products requests
router.get("/", checkAuth, productsController.productsGetAll);

router.post(
	"/",
	checkAuth,
	upload.single("productImage"),
	productsController.postProduct
);

router.get("/:productId", checkAuth, productsController.getProduct);
router.patch("/:productId", checkAuth, productsController.patchProduct);
router.delete("/:productId", checkAuth, productsController.deleteProduct);

module.exports = router;
