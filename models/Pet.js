const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  gallery: {
    type: [String]
  },
  breed: {
    type: [String],
    required: true
  },
  food: {
    type: [String]
  },
  medications: {
    type: [String]
  },
  personality: {
    type: String
  },
  bio: {
    type: String
  },
  slackspace: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  adopted: {
    type: Boolean,
    default: false
  },
  clusterRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  cluster: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pet = mongoose.model("pet", PetSchema);
