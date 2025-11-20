const express = require("express");
const route = require("./routes/song.route");

const app = express(); // i create the server

app.use(express.json()); // read JSON data

app.use("/", route);

module.exports = app;
