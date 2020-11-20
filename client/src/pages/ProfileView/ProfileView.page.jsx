import React, { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList.component";
import { getUserInfo } from "./profileview-helper";

const ProfileView = ({ match }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo(match.params.username).then((response) => {
      const data = response.data;
      setPosts(data.posts);
      setUser(data.user);
    });
  }, []);

  return (
    <div>
      <div className="jumbotron p-3">
        <div className="flex flex-column">
          <h3 className="my-1">u/{user.username}</h3>
          <p className="my-1">posts: {posts.length}</p>
        </div>
      </div>
      <div>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default ProfileView;
