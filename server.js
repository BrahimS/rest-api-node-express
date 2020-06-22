const http = require("http");
const app = require("./app");

// Defind the port
const port = process.env.PORT || 3000;
// Create the server
const server = http.createServer(app);
// Start the server
server.listen(port);
console.log(`You are listening to: http://localhost:${port} `);
