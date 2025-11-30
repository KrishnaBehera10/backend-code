const express = require("express");
const authmiddleware = require("../middleware/auth.middleware");
const postcontroller = require("../controllers/post.controller");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/post", authmiddleware, upload.single("img"), postcontroller);

module.exports = router;
