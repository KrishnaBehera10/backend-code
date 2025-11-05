const mongoose = require("mongoose");

async function connectMongoose() {
  try {
    await mongoose.connect(
      "mongodb+srv://KRISHNA_BEHERA:3u9zywhWXEiK4z3V@krishnadb.0aaixk1.mongodb.net/"
    );
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("mongodb connection error", error);
  }
}

module.exports = connectMongoose;
