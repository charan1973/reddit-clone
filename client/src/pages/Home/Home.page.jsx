import { Button } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard.component";
import PostList from "../../components/PostList/PostList.component";
import { UserContext } from "../../context/user/UserContext";
import { getAllPosts } from "./home-helper";

const Home = () => {

  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext);

  useEffect(() => {
      getAllPosts().then((response) => {
        setPosts(response.data)
      });
  }, []);

  return (
    <div>
      {user && (
        <div className="my-2">
          <Button
            style={{ height: "40px" }}
            variant="contained"
            fullWidth
            color="secondary"
            href="/post/create"
          >
            Create Post
          </Button>
        </div>
      )}
      <div>{ posts.length > 0 && <PostList posts={posts} />}</div>
    </div>
  );
};

export default Home;
