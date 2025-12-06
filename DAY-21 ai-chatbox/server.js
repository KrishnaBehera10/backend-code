require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { AIGenerate } = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("a user connection successfully");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", async (msg) => {
    const response = await AIGenerate(msg);

    socket.emit("ai-response", response);
  });
});

httpServer.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
