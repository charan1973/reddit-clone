import { Link } from "react-router-dom";
import TimeStamp from "../TimeStamp/TimeStamp.component";

const CreationDetails = ({ postedSubreddit, postedUser, timestamp }) => {
  return (
    <div style={{ fontSize: "12px" }}>
      <Link style={{fontWeight: "700"}} to={`/r/${postedSubreddit}`}>r/{postedSubreddit}</Link>
      <span className="grey">&#8231;</span>
      <span className="grey">posted by</span>
      <Link to={`/u/${postedUser}`} className="grey" style={{ padding: "2px" }}>
        u/{postedUser}
      </Link>
      <span className="grey">&#8231;</span>
      <TimeStamp timestamp={timestamp} />
    </div>
  );
};

export default CreationDetails;
