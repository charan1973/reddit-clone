import React from "react";
import {Button} from "@material-ui/core"

const Jumbotron = ({ subredditName, joinedCount, joined, onClick }) => {
  return (
    <div className="jumbotron">
      <div className="flex flex-column">
        <h2 className="p-2">r/{subredditName}</h2>
        <div className="flex">
        <p className="p-1">joined: {joinedCount}</p>
        <Button onClick={onClick} variant={`${joined ? "outlined" : "contained"}`} color="primary">{joined ? "Joined" : "Join"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
