const express = require("express");

const app = express();

app.use(express.json()); // Middleware to parse JSON request body

app.get("/", (req, res) => {
  res.send("hello");
});

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.json({
    message: "note added succesfully",
    notes: notes,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
