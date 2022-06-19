"use-strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const articControllers = require("./controllers/artic.controller");
const crud = require("./controllers/artic.crud.controller");

const port = process.env.PORT || 8081;

const mymongoose = require("mongoose");

mymongoose.connect("mongodb://localhost:27017/amindb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

//global middle ware
app.use((req, res, next) => {
  console.log("middleware working = " + req.protocol);
  // res.redirect("https://google.com");
  next();
});

app.get("/", (req, res) => {
  res.cookie("visited", "amin");

  res.send("data working");
});

app.get("/artic" /* add controller here */, articControllers.getArtData);

app.listen(port, () => {
  console.log("working listener");
});

//for fav things

app.get("/api/fav/add", crud.addFav);
app.get("/api/fav/get", crud.getFavs);
app.get("/api/fav/delete", crud.deleteFav);
app.get("/api/fav/edit", crud.editFav);
