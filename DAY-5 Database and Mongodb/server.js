const express = require("express");
const connectMongoose = require("./src/db");

connectMongoose();

const app = express(); // this line will create a server

app.use(express.json()); //read JSON Data

app.get("/", (req, res) => {
  res.send("hello backend");
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  console.log(title, content);
});

app.listen(3000, () => console.log("servre is running on port 3000"));
