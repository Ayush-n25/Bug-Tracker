const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addProject = new mongoose.Schema({
  ProjectName: {
    type: String,
    required: true,
  },
  LeaderName: {
    type: String,
    required: true,
  },
  LeaderEmail: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    required: true,
  },
  ProjectDescription: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  NoBugs: {
    type: Number,
    required: true,
  },
});

const Add_project = mongoose.model("project", addProject);
module.exports = Add_project;