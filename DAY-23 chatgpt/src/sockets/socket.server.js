const { Server } = require("socket.io");

async function socketserver(httpServer) {
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnected", () => {
      console.log("A user disconnected");
    });

    socket.on("ai-message", async (data) => {});
  });
}

module.exports = socketserver;
