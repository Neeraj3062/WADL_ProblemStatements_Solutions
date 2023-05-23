const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: String,
    film:String,
    md:String,
    singer:String


  }
);

module.exports = mongoose.model("Song", SongSchema);
