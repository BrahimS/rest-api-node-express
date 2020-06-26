const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
	try {
		const token = request.headers.authorization.split(" ")[1];

		const decoded = jwt.verify(token, process.env.JWT_PASS);
		request.userData = decoded;
		next();
	} catch (error) {
		console.log(error);
		return response.status(401).json({
			message: "Auth failed",
		});
	}
};
