require("dotenv").config();
const PORT = process.env.PORT;
const app = require("./src/app");
const connectDB = require("./src/db/db");
const { createServer } = require("http");
const { Server } = require("socket.io");

connectDB();

const httpServer = createServer(app);

const io = new Server(httpServer, {});

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
