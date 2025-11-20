const express = require("express");
const multer = require("multer");
const uploadfile = require("../service/store.service");

const route = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

route.post("/song", upload.single("audio"), async (req, res) => {
  console.log(req.file); // CHECK THIS!

  const result = await uploadfile(req.file);
  console.log(result);

  res.status(201).json({
    message: "song uploaded",
    song: req.body,
  });
});

module.exports = route;
