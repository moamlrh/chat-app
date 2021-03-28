import React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles(() => ({
  user: {
    padding: "15px",
  },
  name: {
    fontSize: "50px",
  },
}));

function ConversationUsers({ conversation }) {
  const classes = useStyles();
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const userInfo =
    userId == conversation.users.user1._id
      ? conversation.users.user2
      : conversation.users.user1;
  const time = moment(conversation.updatedAt).format("hh:mm a");
  if(!userInfo) return
  return (
    <>
      <ListItem
        className={classes.user}
        button
        onClick={() => history.push(`/chat/${conversation._id}`)}
      >
        <ListItemAvatar>
          <Avatar>{userInfo.name.split("")[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          className={classes.name}
          primary={userInfo.name}
          secondary={conversation.lastMessage}
        />
        <Typography variant="body2">{time}</Typography>
      </ListItem>
      <Divider />
    </>
  );
}

export default ConversationUsers;
