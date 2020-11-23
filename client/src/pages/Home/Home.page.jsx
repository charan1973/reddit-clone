import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList.component";
import { UserContext } from "../../context/user/UserContext";
import { getAllPosts, getPostsFromJoined } from "./home-helper";


const Home = ({ history }) => {

  const [posts, setPosts] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState("")
  const [joinedPosts, setJoinedPosts] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (joinedPosts) {
      getPostsFromJoined().then((response) => {
        const data = response.data;
        if(data.posts.length === 0){
          setEmptyMessage("No Subreddits joined")
        }
        setPosts(data.posts);
      });
    } else {
      getAllPosts().then((response) => {
        if(response.data.length === 0){
          setEmptyMessage("Wow! Such Empty")
        }
        setPosts(response.data);
      });
    }
  }, [joinedPosts]);

  const handleChange = (e) => {
    setJoinedPosts(e.target.value);
  };

  return (
    <div>
      {user && (
        <>
        <div className="flex justify-center">
          <FormControl variant="outlined">
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={joinedPosts}
              onChange={handleChange}
            >
              <MenuItem value={false}>All</MenuItem>
              <MenuItem value={true}>Joined</MenuItem>
            </Select>
          </FormControl>
        </div>
          <div className="my-2">
            <Button
              style={{ height: "40px" }}
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => history.push("/post/create")}
            >
              Create Post
            </Button>
          </div>
        </>
      )}
      <div>
        {posts.length > 0 ? <PostList posts={posts} /> : <p className="text-center">{emptyMessage}</p>}
      </div>
    </div>
  );
};

export default Home;
