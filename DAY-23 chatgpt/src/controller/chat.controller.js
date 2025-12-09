const chatmodel = require("../models/chat.model");

async function chatcontroller(req, res) {
  const { title } = req.body;
  const user = req.user;

  try {
    const chat = await chatmodel.create({
      title: title,
      userId: user._id,
    });

    res.status(200).json({
      message: "chat create successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

module.exports = chatcontroller;
