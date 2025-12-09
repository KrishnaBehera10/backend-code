const express = require("express");
const authmiddleware = require("../middleware/auth.middleware");
const chatcontroller = require("../controller/chat.controller");

const router = express();

router.post("/chat", authmiddleware, chatcontroller);

module.exports = router;
