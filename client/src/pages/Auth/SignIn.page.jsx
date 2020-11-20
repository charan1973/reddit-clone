import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./auth-styles";
import { useContext, useState } from "react";
import { signInAuth } from "./auth-helper";
import { UserContext } from "../../context/user/UserContext";
import { LOGIN_USER } from "../../context/user/userTypes";
import { SHOW_ERROR, SHOW_INFO } from "../../context/message/messageTypes";
import { MessageContext } from "../../context/message/MessageContext";
import { headerConfig } from "../../headerConfig";

function SignIn() {
  const history = useHistory();
  const classes = useStyles();

  const { userDispatch } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

  const [cred, setCred] = useState({
    username: "charan1973",
    password: "12345678",
  });

  const { username, password } = cred;

  const handleChange = (e) => {
    const name = e.target.name;
    setCred({ ...cred, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInAuth(cred).then((response) => {
      const data = response.data;
      if (data.error) {
        messageDispatch({
          type: SHOW_ERROR,
          message: data.error,
        });
      }
      if (!data.error) {
        userDispatch({
          type: LOGIN_USER,
          user: data,
        });
        messageDispatch({
          type: SHOW_INFO,
          message: "Logged in successfully",
        });
        setTimeout(() => {
          if (localStorage.getItem("user") !== "") {
            headerConfig.headers["auth-token"] = JSON.parse(
              localStorage.getItem("user")
            ).token;
            console.log(headerConfig);
            history.push("/");
          }
        }, 2000);
      }
    });
    setCred({ username: "", password: "" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Log in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link to="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
