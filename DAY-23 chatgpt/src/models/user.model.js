const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    fullname: {
      firstname: {
        type: String,
        require: true,
      },
      lastname: {
        type: String,
        require: true,
      },
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const usermodel = mongoose.model("user", userschema);

module.exports = usermodel;
