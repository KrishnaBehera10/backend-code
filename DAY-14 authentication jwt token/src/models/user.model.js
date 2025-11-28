const mongoose = require("mongoose");

const usermongoose = new mongoose.Schema({
  username: String,
  password: String,
});

const usermodel = mongoose.model("user", usermongoose);

module.exports = usermodel;
