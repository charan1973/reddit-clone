const { options } = require("@hapi/joi");
const Post = require("../models/Post");

exports.getSinglePost = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  return res.json({ post });
};

// Create Post
exports.createPost = async (req, res) => {
  const { title, message, subreddit } = req.body;

  // Create Post
  const newPost = new Post({
    title,
    message,
    postedSubreddit: subreddit,
    creator: req.user._id,
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
    return res.status(403).json({ error: "You cannot edit this post" });

  post.message = newMessage;
  const updatedPost = await post.save();

  return res.json({ message: "Updated post" });
};

// Delete post
exports.removePost = async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.creator != req.user._id)
    return res.status(403).json({ error: "You cannot delete this post" });

  const deletedPost = await Post.findByIdAndDelete(postId);

  return res.json({ message: "Post deleted successfully" });
};

exports.getPosts = async (req, res) => {
  const allPosts = await Post.find({}).populate("creator postedSubreddit").sort("votes");
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
    postFound.upvoted.splice(postFound.upvoted.indexOf(req.user._id), 1);
    const upvoteRemoved = await postFound.save();
    return res.json({ message: "Upvote removed" });
  } else {
    // Remove downvote
    if (postFound.downvoted.includes(req.user._id)) postFound.downvoted.splice(postFound.downvoted.indexOf(req.user._id), 1);
    // push the user into the upvote array
    postFound.upvoted.push(req.user._id);
    const upvotedPost = await postFound.save();
    return res.json({ message: "Upvoted" });
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
    postFound.downvoted.splice(postFound.downvoted.indexOf(req.user._id), 1);
    const downvoteRemoved = await postFound.save();
    return res.json({ message: "Downvote removed" });
  } else {
    // Remove downvote
    if (postFound.upvoted.includes(req.user._id)) postFound.upvoted.splice(postFound.upvoted.indexOf(req.user._id), 1);
    // push the user into the upvote array
    postFound.downvoted.push(req.user._id);
    const downvotedPost = await postFound.save();
    return res.json({ message: "Downvoted" });
  }
};

// Comment On Posts

//Post comment
exports.postComment = async (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.comments.push({ user: req.user._id, comment });
  const savePost = await post.save();

  return res.json({ message: "Comment added" });
};

// Edit comment
exports.editComment = async (req, res) => {
  const postId = req.params.postId;
  const { commentId, newComment } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post Not found" });

  post.comments.forEach((comment) => {
    if (comment._id == commentId) {
      comment.comment = newComment;
    }
  });

  const savePost = await post.save();

  return res.json({ message: "Comment edited" });
};

//Delete Comment
exports.removeComment = async (req, res) => {
  const postId = req.params.postId;
  const { commentId } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post Not found" });

  post.comments.splice(post.comments.indexOf({ _id: commentId }), 1);
  const savePost = await post.save();

  return res.json({ message: "Comment deleted" });
};
