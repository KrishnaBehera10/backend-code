const express = require("express");
const authroute = require("./routers/auth.route");
const userchat = require("../src/routers/chat.route");

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/auth/user", authroute);
app.use("/user", userchat);

module.exports = app;
