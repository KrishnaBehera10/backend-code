import mongoose from "mongoose";

const songschema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
});

const song = mongoose.model("song", songschema);

export default song;
