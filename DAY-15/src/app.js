const express = require("express");
const authRouter = require("./routers/auth.route");
const postRouter = require("./routers/post.route");
const cookieParser = require("cookie-parser");

const app = express(); // Create Express app

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); //read cookies from incoming requests

app.use("/auth", authRouter);
app.use("/", postRouter);

module.exports = app;
