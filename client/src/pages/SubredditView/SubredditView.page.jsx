import React, { useState, useEffect, useContext } from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron.component";
import { getSubredditInfo, joinSubreddit } from "./subredditview-helper";
import PostCard from "../../components/PostCard/PostCard.component";
import { UserContext } from "../../context/user/UserContext";
import { MessageContext } from "../../context/message/MessageContext";
import { SHOW_ERROR, SHOW_INFO } from "../../context/message/messageTypes";
import PostList from "../../components/PostList/PostList.component";

const SubredditView = ({ match }) => {
  const { user } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

  const [subredditInfo, setSubredditInfo] = useState({
    subreddit: {},
    joinedCount: "",
    joinedList: [],
    posts: [],
  });

  const [joinFetch, setJoinFetch] = useState(false);

  const { subreddit, joinedCount, posts, joinedList } = subredditInfo;

  useEffect(() => {
    getSubredditInfo(match.params.subredditName).then((response) => {
      const data = response.data;
      setSubredditInfo({
        ...subredditInfo,
        subreddit: data.subreddit,
        posts: data.allPosts,
        joinedCount: data.joinedPeopleInSub.length,
        joinedList: data.joinedPeopleInSub,
      });
    });
  }, [joinFetch]);

  const handleJoinClick = () => {
    if (user) {
      joinSubreddit(subreddit._id).then((response) => {
        const data = response.data;
        messageDispatch({
          type: SHOW_INFO,
          message: data.message,
        });
        setJoinFetch(!joinFetch);
      });
    } else {
      messageDispatch({
        type: SHOW_ERROR,
        message: "You must be logged in",
      });
    }
  };

  return (
    <div>
      <div>
        <Jumbotron
          subredditName={subreddit.name}
          joinedCount={joinedCount}
          joined={
            user && joinedList.find((joined) => joined["_id"] === user.user._id)
          }
          onClick={handleJoinClick}
        />
      </div>
      <div>
          <PostList posts={posts}/>
      </div>
    </div>
  );
};

export default SubredditView;
