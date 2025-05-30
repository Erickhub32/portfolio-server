const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  client: {
    type: String,
  },

  description: {
    type: String,
    required: true
  },

  technologies: [String],

  link: String,

  imageUrl: {
    type: String,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

},
  {
    timestamps: true

  }

);

const Project = model("Project", ProjectSchema);

module.exports = Project;
