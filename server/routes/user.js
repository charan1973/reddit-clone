const { getUser, getPostsOfSubredditsJoined } = require("../controllers/user")
const { verifyToken } = require("../validator/validator")

const router = require("express").Router()

router.get("/u/:username", getUser)
router.get("/u/post/joined-subs", verifyToken, getPostsOfSubredditsJoined)

module.exports = router