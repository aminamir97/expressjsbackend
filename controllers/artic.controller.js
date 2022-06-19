"use-strict";
const superagent = require("superagent");
const ArticModel = require("../models/artic.model");

const getArtData = async (req, res) => {
  const url = "https://api.artic.edu/api/v1/artworks";
  try {
    const data = await superagent.get(url);
    // res.send(data.body.data[0].title);
    const listItems = data.body.data.map((e) => {
      const item = new ArticModel(e);
      return item;
    });
    res.send(listItems);
  } catch (error) {
    console.log("error : " + error);
  }
};

module.exports = {
  getArtData,
};
