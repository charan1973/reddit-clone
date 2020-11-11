const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		maxlength: 64,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	bio: {
		type: String,
	},
	subredditsJoined: [{type: ObjectId, ref: "Subreddit"}]
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User