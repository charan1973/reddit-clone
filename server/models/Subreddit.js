const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subredditSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100
    },
    about: {
      type: String,
      maxlength: 1000
    },
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Subreddit = mongoose.model("Subreddit", subredditSchema)

module.exports = Subreddit