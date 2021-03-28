import React, { useState } from "react";
import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { green } from "@material-ui/core/colors";
import { handleCreateNewConversation } from "../utils/utils";

const useStyles = makeStyles(() => ({
  greenDot: {
    padding: "5px",
    borderRadius: "50%",
    backgroundColor: green[600],
  },
}));

function ActiveUsers({ user }) {
  const history = useHistory();
  const classes = useStyles();

  const createNewConversation = () => {
    handleCreateNewConversation(user._id).then((conversation) => {
      history.push(`/chat/${conversation._id}`);
    });
  };
  
  return (
    <ListItem onClick={createNewConversation} button>
      <ListItemAvatar>
        <Avatar>{user.name.split("")[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.name} />
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <span className={classes.greenDot}></span>
      </Badge>
    </ListItem>
  );
}

export default ActiveUsers;
