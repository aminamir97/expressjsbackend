"use-strict";

class ArticModel {
  constructor(data) {
    this.title = data.title;
    this.thumbnail = data.thumbnail.lqip;
    this.artist_name = data.artist_title;
    this.desc = data.credit_line;
  }
}

module.exports = ArticModel;
