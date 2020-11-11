import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import {useStyles} from "./auth-styles"
import { useState } from "react";
import { signInAuth } from "./auth-helper";

function SignIn() {
  const history = useHistory()
  const classes = useStyles();

  const [cred, setCred] = useState({
      username: "",
      password: ""
  })



  const {username, password} = cred

  const handleChange = (e) => {
    const name = e.target.name
    setCred({...cred, [name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signInAuth(cred)
    setCred({username: "", password: ""})
    setTimeout(() => {
      if(localStorage.getItem("user")){
        history.push("/")
      }
    }, 2000)
  }

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

export default SignIn