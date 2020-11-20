const Post = require("../models/Post");
const User = require("../models/User");

exports.getUser = async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne(
    { username },
    "-password -createdAt -updatedAt"
  );
  if (!user) return res.json({ error: "User not found" });

  const posts = await Post.find({ creator: user._id }).populate(
    "postedSubreddit creator",
    "name username"
  );

  return res.json({ user, posts });
};

exports.getPostsOfSubredditsJoined = async (req, res) => {
  const user = await User.findById(req.user._id);

  const subredditPosts = await Post.find({
    postedSubreddit: user.subredditsJoined,
  }).populate("postedSubreddit creator", "name username");

  return res.json({ posts: subredditPosts });
};
