const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: Object
    },
    postedSubreddit: {
      type: ObjectId,
      ref: "Subreddit",
    },
    creator: {
      type: ObjectId,
      ref: "User",
    },
    comments: [{ user: { type: ObjectId, ref: "User" }, comment: String }],
    upvoted: [{ type: ObjectId, ref: "User" }],
    downvoted: [{ type: ObjectId, ref: "User" }],
  },
  {
    toObjects: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

postSchema.virtual("votes").get(function () {
  return this.upvoted.length - this.downvoted.length;
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
