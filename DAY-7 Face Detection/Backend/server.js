require("dotenv").config();

const app = require("./src/app.js");
const connectmongoose = require("./src/db/db.js");

connectmongoose();
const port = 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));
