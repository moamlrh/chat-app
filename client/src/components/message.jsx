import { Avatar, Box, Chip, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import monment from 'moment'

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    flexDirection: "column",
  },
  msg: {
    margin: "10px 20px",
    padding: "20px 5px",
    fontSize: "18px",
  },
  byMe: {
    alignSelf: "flex-end",
    backgroundColor: "#45A1FF",
  },
  byAnother: {
    alignSelf: "flex-start",
  },
  timeMe:{
    alignSelf: "flex-end",
    color:'gray',
    margin:'0px 30px'
  },
  timeAnother:{
    alignSelf: "flex-start",
    color:'gray',
    margin:'0px 30px'
  }
}));

function MessageComponent({ message }) {
  const classes = useStyles();
  const userId = localStorage.getItem("userId");
  const time = monment(message.createdAt).format('hh:mm a')
  return (
    <>
      <Box className={classes.box}>
        <Chip
          avatar={<Avatar>{message.sent_by.name.split("")[0]}</Avatar>}
          label={message.text}
          color="primary"
          size="medium"
          className={`${classes.msg} ${
            message.sent_by._id.toString() == userId
              ? classes.byMe
              : classes.byAnother
          }`}
        />
        <Typography
          variant="subtitle2"
          className={
            message.sent_by._id.toString() == userId
              ? classes.timeMe
              : classes.timeAnother
          }
        >
          {time}
        </Typography>
      </Box>
    </>
  );
}

export default MessageComponent;
