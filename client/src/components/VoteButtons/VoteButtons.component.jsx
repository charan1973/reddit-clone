import { useContext, useState } from "react";
import { MessageContext } from "../../context/message/MessageContext";
import { SHOW_ERROR } from "../../context/message/messageTypes";
import { UserContext } from "../../context/user/UserContext";
import {upvote, downvote} from "./vote-helper.js"

const VoteButtons = ({
  voteCount,
  upvotes,
  downvotes,
  postId,
}) => {
  const { user } = useContext(UserContext);
  const {messageDispatch} = useContext(MessageContext)

  const [vote, setVote] = useState({
    upvoteState: upvotes,
    downvoteState: downvotes,
    voteCountState: voteCount,
  });

  const { upvoteState, downvoteState, voteCountState } = vote;

  const handleClick = (e) => {
    if (user) {
      if (e.target.getAttribute("name") === "upvote") {
        upvote(e.target.dataset.id).then((response) => {
          const data = response.data.post
          setVote({
            upvoteState: data.upvoted,
            downvoteState: data.downvoted,
            voteCountState: data.votes
          })
        });
      } else if (e.target.getAttribute("name") === "downvote") {
        downvote(e.target.dataset.id).then((response) => {
          const data = response.data.post
          setVote({
            upvoteState: data.upvoted,
            downvoteState: data.downvoted,
            voteCountState: data.votes
          })
        });
      }
    }else{
      messageDispatch({
        type: SHOW_ERROR,
        message: "You must be logged in to do this"
      })
    }
  };

  return (
    <div>
      <i
        onClick={handleClick}
        name="upvote"
        data-id={postId}
        className={`fas fa-arrow-up ${
          user && upvoteState.includes(user.user._id) && "upvote-color"
        }`}
      ></i>
      <span style={{ padding: "10px" }}>
        {voteCountState > 0 || voteCountState < 0 ? voteCountState : "Vote"}
      </span>
      <i
        name="downvote"
        onClick={handleClick}
        data-id={postId}
        className={`fas fa-arrow-down ${
          user && downvoteState.includes(user.user._id) && "downvote-color"
        }`}
      ></i>
    </div>
  );
};

export default VoteButtons;
