const express = require("express");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Welcome to the AI Chatbox API");
});

module.exports = app;
