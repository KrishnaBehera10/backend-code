const express = require("express");

const app = express();

app.use(express.json()); // build in middlware read JSON data

let notes = [];
//get
app.get("/notes", (req, res) => {
  res.json({
    notes,
  });
});
//post
app.post("/notes", (req, res) => {
  const title = req.body;
  notes.push(title);

  res.json({
    data: req.body,
  });
});

//patch
app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  notes[id].title = title;

  res.json({
    message: "note update",
    update: notes[id].title,
  });
});

//delete
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  notes.splice(id, 1);

  res.json({
    notes,
  });
});

app.listen(3000, () => console.log("server running on port 3000"));
