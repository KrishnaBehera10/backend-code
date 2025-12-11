const { Server } = require("socket.io");
const cookies = require("cookie");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");
const generateContent = require("../service/ai.service");
const messagemodel = require("../models/message.model");

async function socketserver(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    try {
      const cookie = cookies.parse(socket.handshake.headers.cookie);

      if (!cookie) {
        next(new Error(`Authentication error : No token`));
      }

      const decode = jwt.verify(cookie.token, process.env.JWT_SECRET);
      const user = await usermodel.findById(decode.id);

      socket.user = user;
      next();
    } catch (error) {
      next(new Error(`Authentication error : No token`));
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnected", () => {
      console.log("A user disconnected");
    });

    socket.on("ai-message", async (data) => {
      await messagemodel.create({
        user: socket.user.id,
        chatId: data.chatId,
        content: data.content,
        role: "user",
      });

      const chathistory = await messagemodel.find({ chatId: data.chatId });

      const message = chathistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const response = await generateContent(message);

      await messagemodel.create({
        user: socket.user.id,
        chatId: data.chatId,
        content: response,
        role: "model",
      });
      socket.emit("ai-response", { response: response, chatId: data.chatId });
    });
  });
}

module.exports = socketserver;
