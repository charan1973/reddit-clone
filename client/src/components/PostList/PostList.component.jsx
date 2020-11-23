import React from "react";
import PostCard from "../PostCard/PostCard.component";

const PostList = ({posts}) => {
  return (
    <>
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
            upvotes={post.upvoted}
            downvotes={post.downvoted}
            postId={post._id}
            image={post.image ? post.image : ""}
          />
        );
      })}
    </>
  );
};

export default PostList;
