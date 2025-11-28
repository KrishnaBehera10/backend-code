const mongoose = require("mongoose");

async function mongoosedbconnection() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("mongoosedb connection successfully");
  } catch (error) {
    console.log("mongoosedb connection Error", error);
  }
}

module.exports = mongoosedbconnection;
