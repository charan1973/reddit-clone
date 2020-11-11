import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import { createPost, getAllSubreddits } from "./post-helper";
import { PinDropSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(1)
  }
}));

const CreatePost = (props) => {
  const classes = useStyles();
  const [postInput, setPostInput] = useState({
    title: "",
    message: "",
    subreddit: "",
    subredditsList: [],
  });

  const { title, message, subredditsList, subreddit } = postInput;

  useEffect(() => {
    getAllSubreddits().then((response) => {
      // console.log(response.data);
      setPostInput({ ...postInput, subredditsList: response.data.subreddits });
    });
  }, []);

  const mdParser = new MarkdownIt();

  const handleChange = (e) => {
      const name = e.target.name
    setPostInput({ ...postInput, [name]: e.target.value });
  };

  const handleEditorChange = ({ html, text }) => {
    setPostInput({ ...postInput, message: html });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postInput).then((response) => {
      console.log(response.data);
      setTimeout(() => props.history.push("/"), 1000)
    });
  };

  const config = {
    view: {
      html: false,
      menu: true,
      md: true,
    },
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Subreddit
          </InputLabel>
          <Select
            value={subreddit}
            onChange={handleChange}
            name="subreddit"
            label="Subreddit"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subredditsList.map((subreddit) => {
              return (
                <MenuItem key={subreddit._id} value={subreddit._id}>{subreddit.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          name="title"
          label="Post Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleChange}
          autoComplete="off"
          className={classes.textField}
        />
        <MdEditor
          style={{ height: "300px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          config={config}
          className={classes.textField}
        />
        <Button type="submit" variant="contained" color="secondary">
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
