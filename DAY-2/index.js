const http = require("http");

// http.createserver it will create a server
const server = http.createServer((req, res) => {
  res.end("hello world from backend");
  // this line i programed the server / trained the server
});

//i will start the server
server.listen(3000, () => console.log("server is running on port 3000"));
