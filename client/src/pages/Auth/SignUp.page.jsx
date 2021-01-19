import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./auth-styles";
import { signUpAuth } from "./auth-helper";
import { useContext, useState } from "react";
import { SHOW_ERROR, SHOW_INFO } from "../../context/message/messageTypes";
import { MessageContext } from "../../context/message/MessageContext";

function SignUp() {
  const {messageDispatch} = useContext(MessageContext)

  const history = useHistory()
  const classes = useStyles();

  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const { username, password } = cred;

  const handleChange = (e) => {
    const name = e.target.name
    setCred({ ...cred, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpAuth(cred).then((response) => {
      const data = response.data
      console.log(data);
      if (data.error) {
        messageDispatch({
          type: SHOW_ERROR,
          message: data.error,
        });
      }
      if (!data.error) {
        messageDispatch({
          type: SHOW_INFO,
          message: "Signed up successfully",
        });
        setTimeout(() => {
          if (localStorage.getItem("user")) {
            history.push("/login");
          }
        }, 2000);
      }


      setCred({ username: "", password: "" });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Sign up
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
            Sign Up
          </Button>
          <Link to="/signin" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
