"use-strict";

const artPieceModel = require("../models/artic.mongoose.model");

const addFav = async (req, res) => {
  try {
    const { title, thumbnail, artist_name, desc } = req.body;
    const isExist = await artPieceModel.find({ title: title });
    if (isExist.length <= 0) {
      const newItem = new artPieceModel({
        title: title,
        thumbnail: thumbnail,
        artist_name: artist_name,
        desc: desc,
      });
      newItem.save();
      res.send(newItem);
    } else {
      throw "unique title already exist";
    }
  } catch (error) {
    res.send("error " + error);
  }
};

const getFavs = async (req, res) => {
  const all = await artPieceModel.find({});
  res.send(all);
};

const deleteFav = async (req, res) => {
  const { title, thumbnail, artist_name, desc } = req.body;
  const result = await artPieceModel.findOneAndDelete({ title: title });
  res.send(result);
};

const editFav = async (req, res) => {};

module.exports = {
  addFav,
  getFavs,
  deleteFav,
  editFav,
};
