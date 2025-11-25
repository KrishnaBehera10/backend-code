const express = require("express");
const router = require("./routers/auth.route");

const app = express(); // this create a server

app.use(express.json()); // read json data

app.use("/auth", router); // singup api

module.exports = app;
