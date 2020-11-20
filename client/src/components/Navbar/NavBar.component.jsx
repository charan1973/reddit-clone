import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import RedditLogo from "../../assets/Reddit.svg";
import { Link } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { LOGOUT_USER } from "../../context/user/userTypes";
import { MessageContext } from "../../context/message/MessageContext";
import { SHOW_INFO } from "../../context/message/messageTypes";

const NavBar = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
        <div>
          <Link to="/">
            <img height="39px" src={RedditLogo} alt="" />
          </Link>
        </div>
          {!user && (
            <div className="logged-out">
              <Link className="link-button" to="/login">
                <Button>LOGIN</Button>
              </Link>
              <Link className="link-button" to="/signup">
                <Button>SIGNUP</Button>
              </Link>
            </div>
          )}
          {user && (
            <div className="logged-in">
            <Link className="link-button" to="/subreddit/all">
              <Button>Subreddit</Button>
            </Link>
              <Link
                className="link-button"
                to={`/u/${user.user.username}`}
              >
                <Button>Profile</Button>
              </Link>
              <Button
                onClick={() => {
                  userDispatch({ type: LOGOUT_USER });
                  messageDispatch({ type: SHOW_INFO, message: "Logged Out" });
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
