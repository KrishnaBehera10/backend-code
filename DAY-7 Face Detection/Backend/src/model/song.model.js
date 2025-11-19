import mongoose from "mongoose";

const songschema = new mongoose.Schema({
  title: String,
  artist: String,
  song: String,
});

const song = mongoose.model("song", songschema);

export default song;
