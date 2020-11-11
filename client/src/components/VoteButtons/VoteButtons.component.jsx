import { downvote, upvote } from "./vote-helper";

const VoteButtons = ({ voteCount, upvotes, downvotes, postId, handleClick }) => {

  return (
    <div>
      <i
        onClick={handleClick}
        name="upvote"
        id={postId}
        className={`fas fa-arrow-up ${upvotes && "upvote-color"}`}
      ></i>
      <span style={{ padding: "10px" }}>
        {voteCount > 0 || voteCount < 0 ? voteCount : "Vote"}
      </span>
      <i
        name="downvote"
        onClick={handleClick}
        id={postId}
        className={`fas fa-arrow-down ${downvotes && "downvote-color"}`}
      ></i>
    </div>
  );
};

export default VoteButtons;
