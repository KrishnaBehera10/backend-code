require("dotenv").config();
const app = require("./src/app");
const mongoosedbconnection = require("./src/db/db");

mongoosedbconnection();

const port = 3000;

app.listen(port, () => console.log("server is running on port", port));
