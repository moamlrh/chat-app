import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { handleSignupBtn } from "./helpers";
import { useStyle } from "./styles";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyle();

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} variant="h4">
        Signup
      </Typography>
      <Divider />
      <CardContent className={classes.cardContent}>
        <TextField
          className={classes.textField}
          fullWidth
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          className={classes.textField}
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          className={classes.textField}
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
        />
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          variant="outlined"
          disabled={!name || !email || !password ? true : false}
          onClick={() => handleSignupBtn(name, email, password)}
        >
          Signup
        </Button>
        <Typography variant="subtitle1">
          <Link to="/login">already have account?</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default SignupPage;
