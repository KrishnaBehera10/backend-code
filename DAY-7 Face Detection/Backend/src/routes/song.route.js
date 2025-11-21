const express = require("express");
const multer = require("multer");
const uploadfile = require("../service/store.service");
const songmodel = require("../model/song.model");

const route = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

route.post("/song", upload.single("audio"), async (req, res) => {
  try {
    const { mood } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    // Upload to storage (Cloudinary, S3, etc.)
    const result = await uploadfile(req.file);

    const song = await songmodel.create({
      title: result.name,
      mood,
      url: result.url,
    });

    return res.status(201).json({
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

route.get("/song", async (req, res) => {
  try {
    const { mood } = req.query;
    const find = await songmodel.find({ mood: mood });
    return res.status(200).json({
      message: "get successfully",
      songs: find,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "not get data", error });
  }
});

module.exports = route;
