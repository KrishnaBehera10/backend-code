// let catMe = require("cat-me");
// console.log(catMe());

//module by-default in node
const http = require("http");

//now i create a server with http
const server = http.createServer((req, res) => {
  res.end("hello world from the server");
  //on this line i programed this server what require will come it will response the request
});

// now i start server on 3000
server.listen(3000, () => console.log("server is running on 3000..."));
