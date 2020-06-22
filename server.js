const http = require("http");
const app = require("./app");

// Defind the port
const port = process.env.PORT || 3000;
// Create the server
const server = http.createServer(app);
// Start the server
app.listen(port, () => console.log(appLink));
const appLink = `You are listening to the port: http://localhost:${port}`;
