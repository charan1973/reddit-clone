const Subreddit = require("../models/Subreddit");
const _ = require("lodash");
const Post = require("../models/Post");
const User = require("../models/User");

exports.getAllSubreddit = async (req, res) => {
    const subreddits = await Subreddit.find({})
    res.json({subreddits})
}

exports.createSubreddit = async (req, res) => {
    let {name, about} = req.body;
    name = _.toLower(name)
    const subExists = await Subreddit.findOne({name})
    if(subExists) return res.json({error: "Subreddit already exists"})
    const newSubreddit = new Subreddit({
        name: name,
        about: about,
        creator: req.user._id
    })
    
    const savedSubreddit = await newSubreddit.save()

    res.json({message: `Subreddit ${savedSubreddit.name} is created`})
}

exports.getSubredditWithPosts = async (req, res) => {
    const subredditName = req.params.subredditName

    // Check if subreddit exists
    const subreddit = await Subreddit.findOne({name: subredditName}, "name about")
    if(!subreddit) return res.status(404).json({error: "Requested subreddit not found on server"})

    // Get the number of joined users in the subreddit
    const joinedPeopleInSub = (await User.find({subredditsJoined: subreddit._id}, "_id"))
    //Get all posts for the subreddit
    const allPosts = await Post.find({postedSubreddit: subreddit._id}).populate("creator postedSubreddit", "username name")

    //Send the subscriber count, subreddit details and all posts
    return res.json({subreddit, joinedPeopleInSub, allPosts})
}

exports.joinSubreddit = async (req, res) => {
    const {subredditId} = req.body

    // Check if subreddit exists
    const subreddit = await Subreddit.findById(subredditId)
    if(!subreddit) return res.status(404).json({error: "Subreddit not found"})

    const user = await User.findById(req.user._id)
    // If already joined subreddit unjoin
    if(user.subredditsJoined.includes(subreddit._id)){
        user.subredditsJoined.splice(user.subredditsJoined.indexOf(subreddit._id), 1)
        user.save()
        return res.json({message: "Unjoined from subreddit"})
    }
    // Push subreddit id to user subredditsjoined Array
    user.subredditsJoined.push(subreddit._id)
    const saveUser = await user.save()

    return res.json({message: "Joined subreddit"})
}