const mongoose = require("mongoose");

async function mongooseconnection() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("mongoosedb connection successfully");
  } catch (error) {
    console.log("mongoose connection Error", error);
  }
}

module.exports = mongooseconnection;
