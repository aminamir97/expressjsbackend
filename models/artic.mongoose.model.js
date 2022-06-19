"use-strict";
const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  thumbnail: String,
  artist_name: String,
  desc: String,
});
const artPieceModel = mongoose.model("art_pieces", itemSchema);
module.exports = artPieceModel;
