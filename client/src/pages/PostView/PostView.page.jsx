import { Box, Button, Card, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import CreationDetails from "../../components/CreationDetails/CreationDetails.component";
import VoteButtons from "../../components/VoteButtons/VoteButtons.component";
import {
  addComment,
  deleteComment,
  deletePost,
  editPost,
  getCurrentPost,
} from "./postview-helper";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";

import MarkdownView from "../../components/MarkdownView/MarkdownView.component";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { MessageContext } from "../../context/message/MessageContext";
import { SHOW_INFO } from "../../context/message/messageTypes";
import PostBody from "../../components/PostBody/PostBody.component";

const PostView = ({ match, history }) => {
  const { user } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

  const [postContent, setPostContent] = useState({
    postId: "",
    postedSubreddit: "",
    postedUser: "",
    timestamp: "",
    title: "",
    message: "",
    votes: "",
    comments: "",
    upvotes: [],
    downvotes: [],
    isLoaded: false,
  });

  const [newComment, setNewComment] = useState("");
  const [fetchComment, setFetchComment] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    getCurrentPost(match.params.postId).then((response) => {
      const data = response.data.post;
      setPostContent({
        postId: data._id,
        postedSubreddit: data.postedSubreddit.name,
        postedUser: data.creator.username,
        timestamp: data.createdAt,
        title: data.title,
        message: data.message,
        image: data.image,
        votes: data.votes,
        comments: data.comments,
        upvotes: data.upvoted,
        downvotes: data.downvoted,
        isLoaded: true,
      });
    });
  }, [match.params.postId, fetchComment]);

  const handleEditorChange = ({ text }) => {
    setPostContent({ ...postContent, message: text });
  };

  const mdEditorConfig = {
    view: {
      html: false,
      menu: true,
      md: true,
    },
  };

  const handleEditorSubmit = (e) => {
    e.preventDefault();
    editPost(postContent.postId, postContent.message).then((response) => {
      const data = response.data;
      if (data) {
        messageDispatch({
          type: SHOW_INFO,
          message: data.message,
        });
        setShowEdit(!showEdit);
      }
    });
  };

  const handleDeletePost = () => {
    deletePost(postContent.postId).then((response) => {
      const data = response.data;
      messageDispatch({
        type: SHOW_INFO,
        message: data.message,
      });
      history.push("/");
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(match.params.postId, newComment).then((response) => {
      const data = response.data;
      setNewComment("");
      messageDispatch({
        type: SHOW_INFO,
        message: data.message,
      });
      setFetchComment(!fetchComment);
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(match.params.postId, commentId).then((response) => {
      const data = response.data;
      messageDispatch({
        type: SHOW_INFO,
        message: data.message,
      });
      setFetchComment(!fetchComment);
    });
  };

  return (
    postContent.isLoaded && (
      <div>
        <div>
          <div className="flex justify-between">
            <CreationDetails
              postedSubreddit={postContent.postedSubreddit}
              postedUser={postContent.postedUser}
              timestamp="2020-11-02"
            />
            {user && user.user.username === postContent.postedUser && (
              <div>
                {!postContent.image && (
                  <Button
                    onClick={() => setShowEdit(!showEdit)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDeletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div>
            <h2 className="py-1">{postContent.title}</h2>
            {!showEdit && (
              <div className="py-1">
                <PostBody
                  message={postContent.message}
                  image={postContent.image}
                />
              </div>
            )}
            {showEdit && (
              <div>
                <form onSubmit={handleEditorSubmit}>
                  <MdEditor
                    config={mdEditorConfig}
                    onChange={handleEditorChange}
                    value={postContent.message}
                    style={{ height: "300px" }}
                  />
                  <Button type="submit" variant="outlined" color="secondary">
                    Save
                  </Button>
                </form>
              </div>
            )}
          </div>
          <Box display="flex" justifyContent="space-evenly">
            <VoteButtons
              upvotes={postContent.upvotes}
              downvotes={postContent.downvotes}
              voteCount={postContent.votes}
              postId={postContent.postId}
            />
            <span>{postContent.comments.length} Comments</span>
          </Box>
        </div>

        <div id="comments">
          <h3 className="my-1">Comments</h3>
          {user && user.user ? (
            <form onSubmit={handleCommentSubmit}>
              <TextField
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                value={newComment}
              />
              <div className="my-2">
                <Button type="submit" variant="contained" color="primary">
                  Comment
                </Button>
              </div>
            </form>
          ) : (
            <div
              className="p-3 text-center"
              style={{ width: "100%", backgroundColor: "grey" }}
            >
              Login or Signup to comment
            </div>
          )}

          <div id="comment-view">
            {postContent.comments.length > 0
              ? postContent.comments.map((comment) => {
                  return (
                    <Card key={comment._id} className="p-2 my-2">
                      <div className="flex justify-between">
                        <Link
                          to={`/u/${comment.user.username}`}
                          style={{ fontSize: "12px" }}
                          className="my-1"
                        >
                          /u/{comment.user.username}
                        </Link>
                        {user.user && comment.user._id === user.user._id && (
                          <Button
                            onClick={() => handleDeleteComment(comment._id)}
                            variant="outlined"
                            color="secondary"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <p className="my-1">{comment.comment}</p>
                    </Card>
                  );
                })
              : "Wow! such empty"}
          </div>
        </div>
      </div>
    )
  );
};

export default PostView;
