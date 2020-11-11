const {
  createSubreddit,
  getSubredditWithPosts,
  joinSubreddit,
  getAllSubreddit,
} = require("../controllers/subreddit");
const { verifyToken } = require("../validator/validator");

const router = require("express").Router();

router.get("/subreddit/all", getAllSubreddit);
router.get("/r/:subredditName", getSubredditWithPosts); // Get subreddit details with posts and number of subscribers
router.post("/subreddit/create", verifyToken, createSubreddit); //Create subreddit
router.put("/subreddit/join", verifyToken, joinSubreddit); // Join subreddit

module.exports = router;
