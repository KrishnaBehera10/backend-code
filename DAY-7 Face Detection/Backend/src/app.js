const express = require("express");
const route = require("./routes/song.route");
const cors = require("cors");

const app = express(); // i create the server

app.use(express.json()); // read JSON data
app.use(cors());

app.use("/", route);

module.exports = app;
