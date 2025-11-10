const mongoose = require("mongoose");

// what is  schema --->> jis structure mai data store karoge in database mai usko hum schema bolte hain

const noteschema = new mongoose.Schema({
  title: String,
  content: String,
});

//model make it easy perfom operation (create,read,update,delete) corresponding colletion -- collection means --> similar type of data
const notemodel = mongoose.model("note", noteschema);

module.exports = notemodel;
