const mongoose = require("mongoose");

const messageschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    content: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "model"],
      default: "user",
    },
  },
  { timestamps: true }
);

const messagemodel = mongoose.model("message", messageschema);

module.exports = messagemodel;
