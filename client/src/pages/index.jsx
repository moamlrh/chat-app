import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CircularProgress,
  Divider,
  List,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ConversationUsers from "../components/ConversationUser";
import {
  getMyInfoAsUser,
  getAllConversations,
  getAllUsers,
} from "../utils/utils";
import ActiveUsers from "../components/Activeusers";
import { socket } from "../App";
import { toast } from "react-toastify";
import useAudio from "../utils/useAudio";
import sound from "../utils/sound.mp3";
import { addAllUsers } from "./redux/usersSlice";

const useStyle = makeStyles(() => ({
  paper: {
    height: "100vh",
    display: "flex",
    textAlign: "center",
  },
  left: {
    flex: "1",
    margin: "10px",
  },
  right: {
    flex: ".3",
    margin: "10px",
  },
  title: {
    padding: "15px",
    fontWeight: "600",
    backgroundColor: "#45A1FF",
    color: "white",
    textAlign: "center",
  },
  progress: {
    marginTop: "10px",
    textAlign: "center",
  },
  messageDontHave: {
    margin: "20px",
    fontWeight: "700",
  },
  yourName: {
    height: "30px",
    padding: "30px",
  },
}));

export default function MainPage() {
  const classes = useStyle()
  const [conversations, setConversations] = useState(null);
  // const [users, setUsers] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const audio = useAudio(sound);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);

  useEffect(() => {
    socket.on("new-msg", (data) => {
      if (data.sent_by._id != userId) {
        toast.info("new message from : ");
        audio.play();
      }
    });
  }, [socket]);

  useEffect(() => {
    getAllUsers().then(({ users }) => {
      if(users.length){
        dispatch(addAllUsers(users));
      }
    });

    getAllConversations().then(({ conversation }) => {
      setConversations(conversation);
    });

    getMyInfoAsUser().then((user) => {
      setMyInfo(user);
    });
  }, []);

  useEffect(() => {
    socket.on('new-conversation', conversation => {
      setConversations(prev => [conversation, ...prev])
      alert(4)
    })
  }, [socket])

  return (
    <>
      <Typography className={classes.title} variant="h4">
        MOSsenger
      </Typography>
      <Paper className={classes.paper}>
        <Card className={classes.left}>
          <Divider />
          <List>
            {!conversations ? (
              <CircularProgress className={classes.progress} disableShrink />
            ) : !conversations.length ? (
              <Typography variant="h5" className={classes.messageDontHave}>
                You don't have conversations !
              </Typography>
            ) : (
              conversations.map((conv) => (
                <ConversationUsers key={conv._id} conversation={conv} />
              ))
            )}
          </List>
        </Card>
        <Card className={classes.right}>
          <Typography variant="h5" className={classes.yourName}>
            {myInfo && myInfo.name}
          </Typography>
          <Divider />
          <Typography variant="h5" className={classes.messageDontHave}>
            Active Users
          </Typography>
          <List>
            {!state.users ? (
              <CircularProgress className={classes.progress} disableShrink />
            ) : (
              state.users.map((user) => (
                <ActiveUsers key={user._id} user={user} />
              ))
            )}
          </List>
        </Card>
      </Paper>
    </>
  );
}
