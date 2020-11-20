import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar.component";
import "./css/App.css";
import "./css/utilities.css";
import Home from "./pages/Home/Home.page";
import { Container } from "@material-ui/core";
import SignIn from "./pages/Auth/SignIn.page";
import SignUp from "./pages/Auth/SignUp.page";
import PrivateRoute from "./PrivateRoute";
import CreatePost from "./pages/CreatePost/CreatePost.page";
import PostView from "./pages/PostView/PostView.page";
import { useContext } from "react";
import { UserContext } from "./context/user/UserContext";
import Message from "./components/Message/Message.component";
import ProfileView from "./pages/ProfileView/ProfileView.page";
import SubredditAll from "./pages/SubredditAll/SubredditAll.page";
import SubredditView from "./pages/SubredditView/SubredditView.page";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="md" style={{ padding: "30px" }}>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Home} />
          <Route exact path="/post/view/:postId" component={PostView} />
          <Route exact path="/u/:username" component={ProfileView} />
          <Route exact path="/subreddit/all" component={SubredditAll} />
          <Route exact path="/r/:subredditName" component={SubredditView} />
          <PrivateRoute exact path="/post/create" component={CreatePost} />
        </Switch>
      </Container>
      <Message />
    </BrowserRouter>
  );
}

export default App;
