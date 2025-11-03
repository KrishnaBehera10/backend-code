const express = require("express");

const app = express(); // in this line we create a server

app.get("/home", (req, res) => {
  //server is machine.server is programed by us
  res.send("welcome to the home page");
});
app.get("/about", (req, res) => {
  res.send("welcome to the about page");
});
app.get("/contact", (req, res) => {
  res.send("welcome to contact session");
});

// in this line i start the server
app.listen(3000, () => console.log("server is running on port 3000"));

// what is API ---> api is way for 2 application to communicate it each other
// what is REST API ----------->> rest (representational state transfer) it typeof api that follow specific rule and guildline for commnunicate
