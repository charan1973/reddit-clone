import { useHistory } from "react-router-dom";

import "./PostCard.css";
import { Box, Card } from "@material-ui/core";
import VoteButtons from "../VoteButtons/VoteButtons.component";
import CreationDetails from "../CreationDetails/CreationDetails.component"
import MarkdownView from "../MarkdownView/MarkdownView.component";

const Content = ({ title, message, onClick }) => {
  return (
    <div className="pointer" onClick={onClick}>
      <h3>{title}</h3>
      <div>
        <MarkdownView>{message}</MarkdownView>
      </div>
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
      <Content onClick={() => history.push(`/post/view/${postId}`)} postId={postId} title={title} message={message} />
      <Box display="flex" justifyContent="space-evenly">
        <VoteButtons
          postId={postId}
          voteCount={voteCount}
          upvotes={upvotes}
          downvotes={downvotes}
        />
        <span>{commentCount} Comments</span>
      </Box>
    </Card>
  );
};

export default PostCard;
