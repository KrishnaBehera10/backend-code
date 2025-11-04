const express = require("express");

const app = express();

app.use(express.json()); // Middleware to parse JSON request body

app.get("/", (req, res) => {
  res.send("hello");
});

let notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  console.log(notes);

  res.json({
    message: "note added succesfully",
    notes: notes,
  });
});

app.patch("/noteupdate/:id", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  notes[id].title = title;

  res.json({
    message: "title sucessfully update",
    notes,
  });
});

app.get("/getnotes", (req, res) => {
  res.json({
    message: "get note",
    notes,
  });
});

app.delete("/note/:id", (req, res) => {
  const id = req.params.id;

  notes.splice(id, 1);

  res.json({
    message: "successfuly delete",
    notes,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
