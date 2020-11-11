import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import "./PostCard.css";
import { Box, Card } from "@material-ui/core";
import TimeStamp from "../TimeStamp/TimeStamp.component";
import VoteButtons from "../VoteButtons/VoteButtons.component";

const CreationDetails = ({ postedSubreddit, postedUser, timestamp }) => {
  return (
    <div style={{ fontSize: "12px" }}>
      <Link to="#">r/{postedSubreddit}</Link>
      <span className="grey">&#8231;</span>
      <span className="grey">posted by</span>
      <Link to="#" className="grey" style={{ padding: "2px" }}>
        u/{postedUser}
      </Link>
      <span className="grey">&#8231;</span>
      <TimeStamp timestamp={timestamp} />
    </div>
  );
};

const Content = ({ title, message }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>{ReactHtmlParser(message)}</div>
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
  postId,
  handleClick
}) => {
  return (
    <Card style={{ margin: "10px 0px", padding: "20px" }}>
      <CreationDetails
        postedSubreddit={postedSubreddit}
        postedUser={postedUser}
        timestamp={timestamp}
      />
      <Content title={title} message={message} />
      <Box display="flex" justifyContent="space-evenly">
        <VoteButtons
          postId={postId}
          voteCount={voteCount}
          upvotes={upvotes}
          downvotes={downvotes}
          handleClick={handleClick}
        />
        <span>{commentCount} Comments</span>
      </Box>
    </Card>
  );
};

export default PostCard;
