const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  imgurl: { type: String, required: true },
  caption: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const postmodel = mongoose.model("Post", postSchema);

module.exports = postmodel;
