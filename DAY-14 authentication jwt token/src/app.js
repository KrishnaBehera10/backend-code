const express = require("express");
const authrouter = require("./routers/auth.router");
const cookieparser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/auth", authrouter);

module.exports = app;
