const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: Number,
  imageUrl: String,
  title: String,
  description: String,
  stack: String,
  url: String,
});

const Project = mongoose.model("Portfolio", projectSchema);

module.exports = Project;
