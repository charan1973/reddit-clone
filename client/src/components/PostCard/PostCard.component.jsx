import { useHistory } from "react-router-dom";

import "./PostCard.css";
import { Box, Card } from "@material-ui/core";
import VoteButtons from "../VoteButtons/VoteButtons.component";
import CreationDetails from "../CreationDetails/CreationDetails.component"
import MarkdownView from "../MarkdownView/MarkdownView.component";
import PostBody from "../PostBody/PostBody.component"
import numeral from "numeral"

const Content = ({ title, message, image, onClick }) => {
  return (
    <div className="pointer" onClick={onClick}>
      <h3>{title}</h3>
      <PostBody message={message} image={image} />
    </div>
  );
};

const PostCard = ({
  voteCount,
  commentCount,
  postedSubreddit,
  postedUser,
  timestamp,
  message,
  image,
  title,
  upvotes,
  downvotes,
  postId
}) => {

  const history = useHistory()

  return (
    <Card className="postcard" style={{ margin: "10px 0px", padding: "20px" }}>
      <CreationDetails
        postedSubreddit={postedSubreddit}
        postedUser={postedUser}
        timestamp={timestamp}
      />
      <Content onClick={() => history.push(`/post/view/${postId}`)} postId={postId} title={title} message={message} image={image} />
      <Box display="flex" justifyContent="space-evenly">
        <VoteButtons
          postId={postId}
          voteCount={voteCount}
          upvotes={upvotes}
          downvotes={downvotes}
        />
        <span><strong>{numeral(commentCount).format("0a")}</strong> Comments</span>
      </Box>
    </Card>
  );
};

export default PostCard;
