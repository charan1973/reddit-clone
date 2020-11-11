import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import RedditLogo from "../../assets/Reddit.svg";
import { Link } from "react-router-dom";
import { Box, Button, IconButton } from "@material-ui/core";
import { isAuthenticated } from "../../pages/Auth/auth-helper";
import { AccountCircle } from "@material-ui/icons";

const NavBar = () => {
  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link to="/">
            <img height="39px" src={RedditLogo} alt="" />
          </Link>
          {!isAuthenticated() && (
            <div>
              <Button>
                <Link className="nav-link" to="/signin">
                  LOGIN
                </Link>
              </Button>
              <Button>
                <Link className="nav-link" to="/signup">
                  SIGNUP
                </Link>
              </Button>
            </div>
          )}
          {isAuthenticated() && (
            <div>
              <Button>
                <Link className="nav-link" to="/u/signup">Profile</Link>
              </Button>
              <Button onClick={() => {localStorage.removeItem("user")}}>
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
