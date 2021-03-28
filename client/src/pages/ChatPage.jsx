import React, { useEffect, useRef, useState } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { getConversationById, handleSendMessage } from "../utils/utils";
import MessageComponent from "../components/message";
import { socket } from "../App";
import useAudio from "../utils/useAudio";
// import openSocket from 'socket.io-client'
import sound from "../utils/sound.mp3";
import {useDispatch,useSelector} from 'react-redux'

const useStyles = makeStyles(() => ({
  title: {
    padding: "15px",
    fontWeight: "600",
    backgroundColor: "#45A1FF",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  text: {
    flex: "1",
  },
  back: {
    fontSize: "14px",
  },
  card: {
    display: "flex",
    height: "88vh",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
    justifyItems: "space-between",
    alignItems: "space-between",
    textAlign: "center",
  },
  form: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  cardActions: {},
  name: {
    boxShadow: "0px 10px 20px #b0bec5",
    padding: "20px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  progress: {
    textAlign: "cneter",
    margin: "20px",
    alignSelf: "center",
  },
}));

export default function ChatPage() {
  const classes = useStyles();
  const { id } = useParams(); // conversation id form URL
  const [messages, setMessages] = useState(null);
  const [conversationInfo, setConversationInfo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState("");
  const audio = useAudio(sound);
  const history = useHistory();
  const scrollRef = useRef(null);
  const dispatch = useDispatch()
  const state = useSelector(state => state.users)

  useEffect(() => {
    getConversationById(id).then((conversation) => {
      setConversationInfo(conversation);
      setMessages(conversation.messages);
      setUserInfo(
        userId == conversation.users.user1._id
          ? conversation.users.user2
          : conversation.users.user1
      );
    });
  }, []);

  useEffect(() => {
    socket.on("new-msg", (data) => {
      setMessages((prev) => [...prev, data]);
      if (data.sent_by._id != userId) audio.play();
    });
  }, [socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("DOMNodeInserted", (e) => {
        const { currentTarget: target } = e;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);

  return (
    <>
      <Box className={classes.title}>
        <Typography variant="h4" className={classes.text}>
          MOSsenger
        </Typography>
        <IconButton onClick={() => history.push("/")} className={classes.back}>
          back
        </IconButton>
      </Box>
      <Card className={classes.card}>
        {!conversationInfo && !userInfo ? (
          <CircularProgress disableShrink className={classes.progress} />
        ) : (
          <>
            <CardHeader className={classes.name} title={userInfo.name} />
            <div className={classes.cardContent} ref={scrollRef}>
              {!messages ? (
                <CircularProgress disableShrink />
              ) : (
                messages.map((msg) => (
                  <MessageComponent key={msg._id} message={msg} />
                ))
              )}
            </div>
            <CardActions className={classes.cardActions}>
              <form
                className={classes.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue, conversationInfo._id, setInputValue);
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button disabled={!inputValue ? true : false} type="submit">
                  send
                </Button>
              </form>
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
}