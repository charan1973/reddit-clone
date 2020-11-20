const {
  createPost,
  getPosts,
  upvote,
  downvote,
  editPost,
  getSinglePost,
  removePost,
  postComment,
  editComment,
  removeComment,
  uploadImage,
} = require("../controllers/post");
const { multerUpload } = require("../config/multer-setup");
const { verifyToken } = require("../validator/validator");

const router = require("express").Router();

router.get("/post/all", getPosts); //Get All posts
router.get("/post/:postId", getSinglePost); // Get a single post
router.post("/post/create", verifyToken, createPost); //Create post
router.put("/post/upvote", verifyToken, upvote); //Upvote
router.put("/post/downvote", verifyToken, downvote); //Downvote
router.put("/post/edit", verifyToken, editPost); // Edit post
router.delete("/post/delete", verifyToken, removePost); //Remove post

router.post("/post/image", multerUpload.single("upload"), uploadImage)

router.post("/comment/create/:postId", verifyToken, postComment)
// router.put("/comment/edit/:postId", verifyToken, editComment)
router.delete("/comment/delete/:postId", verifyToken, removeComment)

module.exports = router;
