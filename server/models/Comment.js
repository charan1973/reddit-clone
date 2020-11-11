const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    commentor: {
        type: ObjectId,
        ref: "User"
    },
    post: {
        type: ObjectId,
        ref: "Post"
    }
}, {timestamps: true})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment