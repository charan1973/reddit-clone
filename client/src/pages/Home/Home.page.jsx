import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard.component";
import { downvote, upvote } from "../../components/VoteButtons/vote-helper";
import { isAuthenticated } from "../Auth/auth-helper";
import { getAllPosts } from "./home-helper";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response.data);
    });
  }, [posts]);

  const handleClick = (e) => {
    if(isAuthenticated()){
      if (e.target.getAttribute("name") === "upvote") {
        upvote(e.target.id);
      } else if (e.target.getAttribute("name") === "downvote") {
        downvote(e.target.id);
      }
    }
  };

  return (
    <div>
      {isAuthenticated() && (
        <Button
          style={{ height: "60px" }}
          variant="contained"
          fullWidth
          color="secondary"
          href="/post/create"
        >
          Create Post
        </Button>
      )}
      {posts.map((post) => {
        return (
          <PostCard
            key={post._id}
            voteCount={post.votes}
            commentCount={post.comments.length}
            postedSubreddit={post.postedSubreddit.name}
            postedUser={post.creator.username}
            timestamp={post.createdAt}
            title={post.title}
            message={post.message}
            upvotes={
              isAuthenticated() &&
              post.upvoted.includes(isAuthenticated().user._id)
            }
            downvotes={
              isAuthenticated() &&
              post.downvoted.includes(isAuthenticated().user._id)
            }
            postId={post._id}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default Home;
