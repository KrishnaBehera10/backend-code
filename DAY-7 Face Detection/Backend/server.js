import express from "express";
import dotenv from "dotenv";
import connectmongoose from "./src/db/db.js";

dotenv.config();
connectmongoose();

const port = 3000;
const app = express(); // i create the server

app.listen(port, () => console.log(`server is running on port ${port}`));
