const mongoose = require("mongoose");

async function connectmongodb() {
  try {
    await mongoose.connect(
      "mongodb+srv://KRISHNA_BEHERA:3u9zywhWXEiK4z3V@krishnadb.0aaixk1.mongodb.net/crub"
    );
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("mongodb connection Error", error);
  }
}

module.exports = connectmongodb;
