const express = require("express");
const connectmongodb = require("./src/db/db");

const notemodel = require("./src/models/notes.model");

connectmongodb();

const app = express(); // i create server

app.use(express.json()); // read josn data

//crate note

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  const notes = await notemodel.create({ title, content });

  res.json({
    message: "note create successfully ",
    notes,
  });
});

//note

app.get("/notes", async (req, res) => {
  const notes = await notemodel.find();

  res.json({
    message: "note fetch successfully",
    notes,
  });
});

// delete

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const notes = await notemodel.findOneAndDelete({
    _id: id,
  });

  res.json({
    message: "note successfully delete",
  });
});

//patch

app.patch("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await notemodel.findOneAndUpdate(
      { _id: id },
      { title }
    );

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("server is ruuning on port 3000"));
