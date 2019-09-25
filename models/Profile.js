const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
