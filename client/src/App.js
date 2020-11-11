import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar.component";
import "./css/App.css";
import "./css/utilities.css";
import Home from "./pages/Home/Home.page";
import { Container } from "@material-ui/core";
import SignIn from "./pages/Auth/SignIn.page";
import SignUp from "./pages/Auth/SignUp.page";
import PrivateRoute from "./PrivateRoute";
import CreatePost from "./pages/CreatePost/CreatePost.page";
import { isAuthenticated } from "./pages/Auth/auth-helper";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="md" style={{ padding: "30px" }}>
        <Switch>
          <Route
            exact
            path="/signin"
            render={() => isAuthenticated() ? <Redirect to="/" />: <SignIn />}
          />
          <Route
            exact
            path="/signup"
            render={() => isAuthenticated() ? <Redirect to="/" /> : <SignUp />}
          />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/post/create" component={CreatePost} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
