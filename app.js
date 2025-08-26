// imports
import dotenv from "dotenv";
import express from "express";
import connect from "./src/config/db.js"

//configs
dotenv.config();
const port = process.env.PORT || 5500;
const app = express();


app.use(express.json()); //Middleware de interpretacion de JSON


connect().then(() => {
  app.listen(port, () => {
    console.log("http://localhost:" + port);
  });
});