const mongoose = require("mongoose");

const songschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    mood: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const songmodel = mongoose.model("song", songschema);

module.exports = songmodel;
