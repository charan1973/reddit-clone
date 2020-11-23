const uploader = require("../config/cloudinaryConfig");
const Post = require("../models/Post");
const User = require("../models/User")

exports.getSinglePost = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId).populate(
    "creator postedSubreddit comments.user",
    "username name"
  );
  if (!post) return res.status(404).json({ error: "Post not found" });

  return res.json({ post });
};

exports.getPostsFromJoined = async (req, res) => {
  const user = await User.findById(req.user._id, "subredditsJoined")

  const posts = await Post.find({postedSubreddit: user.subredditsJoined}).populate("creator postedSubreddit", "name username").sort("-createdAt")

  res.json({posts})
}

// Create Post
exports.createPost = async (req, res) => {
  let { title, message, subreddit } = req.body;
  let image = "";

  if (req.file !== undefined) {
    message = "";
    const { url, secure_url, public_id, asset_id } = await uploader.upload(
      req.file.path
    );
    image = {
      url,
      secure_url,
      public_id,
      asset_id,
    };
  }

  // Create Post
  const newPost = new Post({
    title,
    message,
    postedSubreddit: subreddit,
    creator: req.user._id,
    image,
  });

  // Save post
  try {
    const savedPost = await newPost.save();
    return res.json({ message: "Posted successfully" });
  } catch (err) {
    console.log(err);
  }
};

// Edit Post
exports.editPost = async (req, res) => {
  const { postId, newMessage } = req.body;

  const post = await Post.findById(postId);
  // Check if creator and editor are same
  if (post.creator != req.user._id)
    return res.json({ error: "You cannot edit this post" });

  if (post.image) return res.json({ error: "Cannot update a image post" });

  post.message = newMessage;
  const updatedPost = await post.save();

  return res.json({ message: "Post updated" });
};

// Delete post
exports.removePost = async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.creator != req.user._id)
    return res.status(403).json({ error: "You cannot delete this post" });

  if (post.image) {
    const deleteImage = await uploader.destroy(post.image.public_id);
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  return res.json({ message: "Post deleted successfully" });
};

exports.getPosts = async (req, res) => {
  const allPosts = await Post.find({}, "-updatedAt")
    .populate("creator postedSubreddit")
    .sort("-createdAt");
  res.json(allPosts);
};

// Post upvote
exports.upvote = async (req, res) => {
  const { postId } = req.body;

  // Find the post
  const postFound = await Post.findById(postId);
  // If already upvoted remove the upvote
  if (postFound.upvoted.includes(req.user._id)) {
    // Remove the upvote
    postFound.upvoted.pull({_id: req.user._id})
    const upvoteRemoved = await postFound.save();
    return res.json({ post: upvoteRemoved });
  } else {
    // Remove downvote
    if (postFound.downvoted.includes(req.user._id))
      postFound.downvoted.pull({_id: req.user._id})
    // push the user into the upvote array
    postFound.upvoted.push(req.user._id);
    const upvotedPost = await postFound.save();
    return res.json({ post: upvotedPost });
  }
};

// Downvote Post
exports.downvote = async (req, res) => {
  const { postId } = req.body;

  // Find the post
  const postFound = await Post.findById(postId);
  // If already downvoted remove the upvote
  if (postFound.downvoted.includes(req.user._id)) {
    // Remove the downvote
    postFound.downvoted.pull(req.user._id);
    const downvoteRemoved = await postFound.save();
    return res.json({ post: downvoteRemoved });
  } else {
    // Remove downvote
    if (postFound.upvoted.includes(req.user._id))
      postFound.upvoted.pull(req.user._id);
    // push the user into the upvote array
    postFound.downvoted.push(req.user._id);
    const downvotedPost = await postFound.save();
    return res.json({ post: downvotedPost });
  }
};

// Comment On Posts

//Post comment
exports.postComment = async (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.json({ error: "Post not found" });

  post.comments.push({ user: req.user._id, comment });
  const savePost = await post.save();

  return res.json({ message: "Comment added" });
};


//Delete Comment
exports.removeComment = async (req, res) => {
  const postId = req.params.postId;
  const { commentId } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.json({ error: "Post Not found" });

  post.comments.pull({_id: commentId})
  const savePost = await post.save();

  return res.json({ message: "Comment deleted" });
};
