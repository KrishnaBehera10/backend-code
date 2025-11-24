const express = require("express");
const router = require("./routes/index.route");

const app = express();

//app level middlware
app.use((req, res, next) => {
  console.log("this middleware is between app and router");
  next();
});

app.use("/", router);

module.exports = app;
