import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleLoginBtn } from "./helpers";
import { useStyle } from "./styles";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyle();

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} variant="h4">
        Login
      </Typography>
      <Divider />
      <CardContent className={classes.cardContent}>
        <TextField
          className={classes.textField}
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button
          variant="outlined"
          onClick={() => handleLoginBtn(email, password)}
          disabled={!email || !password ? true : false}
        >
          Login
        </Button>
        <Typography variant="subtitle1">
          <Link to="/signup">create new account?</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default LoginPage;
