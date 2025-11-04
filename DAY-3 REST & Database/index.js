const exprss = require("express");

const app = exprss(); //now i create a server

app.get("/", (req, res) => {
  res.send("welcome to home page");
});
app.get("/about", (req, res) => {
  res.send("welcome to about page");
});

app.listen(3000, () => console.log("server is running on port 3000"));
//above line i start server
