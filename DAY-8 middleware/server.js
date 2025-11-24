require("dotenv").config();
const app = require("./src/app");
const mongooseconnection = require("./src/db/db");

mongooseconnection();

const port = 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));
