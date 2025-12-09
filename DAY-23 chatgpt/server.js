require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const socketserver = require("./src/sockets/socket.server");
const { createServer } = require("http");
const httpServer = createServer(app);

connectDB();

socketserver(httpServer);

httpServer.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
