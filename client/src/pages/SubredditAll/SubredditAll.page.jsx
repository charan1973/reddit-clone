import { Button, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageContext } from "../../context/message/MessageContext";
import { SHOW_INFO } from "../../context/message/messageTypes";
import { UserContext } from "../../context/user/UserContext";
import { createSubreddit, getAllSubreddit } from "./subredditall-helper";

const SubredditAll = () => {
  const { messageDispatch } = useContext(MessageContext);
  const {user} = useContext(UserContext)

  const [subreddits, setSubreddits] = useState([]);

  const [subredditCreationInputs, setSubredditCreationInputs] = useState({
    name: "",
    about: "",
  });
  const { name, about } = subredditCreationInputs;

  useEffect(() => {
    getAllSubreddit().then((response) => {
      const data = response.data;
      setSubreddits(data.subreddits);
    });
  }, [subredditCreationInputs]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    setSubredditCreationInputs({
      ...subredditCreationInputs,
      [name]: e.target.value,
    });
  };

  const handleSubredditCreate = (e) => {
    e.preventDefault();
    createSubreddit(subredditCreationInputs).then((response) => {
      const data = response.data;
      messageDispatch({
        type: SHOW_INFO,
        message: data.message,
      });
      setSubredditCreationInputs({
        name: "",
        about: "",
        show: !subredditCreationInputs.show,
      });
    });
  };

  return (
    <div>
      {
        user && (
      <div className="flex justify-center flex-column">
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setSubredditCreationInputs({
              ...subredditCreationInputs,
              show: !subredditCreationInputs.show,
            })
          }
        >
          Create Subreddit
        </Button>
        {subredditCreationInputs.show && (
          <div className="create-subreddit-form">
            <form onSubmit={handleSubredditCreate} className="flex flex-column">
              <TextField
                name="name"
                margin="normal"
                variant="outlined"
                label="Subreddit Name"
                required
                value={name}
                onChange={handleInputChange}
              />
              <TextField
                name="about"
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                placeholder="About the subreddit"
                value={about}
                onChange={handleInputChange}
              />
              <div className="flex">
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
                <Button
                  onClick={() =>
                    setSubredditCreationInputs({
                      ...subredditCreationInputs,
                      show: !subredditCreationInputs.show,
                    })
                  }
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
        )
      }

      <div id="subreddit-list">
        {subreddits &&
          subreddits.map((subreddit) => {
            return <div key={subreddit._id} className="subreddit-names">
              <Link className="link-button" to={`/r/${subreddit.name}`}>/r/{subreddit.name}</Link>
            </div>;
          })}
      </div>
    </div>
  );
};

export default SubredditAll;
