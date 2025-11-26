const express = require("express");
const router = require("./routers/auth.router");
const cookieparser = require("cookie-parser");
const app = express();

app.use(express.json()); // read json data
app.use(cookieparser());

app.use("/auth", router);

module.exports = app;
