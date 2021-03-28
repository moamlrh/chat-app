import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import { deepPurple } from "@material-ui/core/colors";

const useStyle = makeStyles(() => ({
  paper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    justifyItems: "center",
    textAlign: "center",

  },
}));

function AuthPage() {
  const classes = useStyle();
  return (
    <Paper className={classes.paper} >
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />

        <Redirect from='/' to='/login' />
      </Switch>
    </Paper>
  );
}

export default AuthPage;
