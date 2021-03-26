import React, { Fragment } from "react";
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface Props {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    textTransform: "none",
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = (props: Props) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar className={classes.root}>
          <Button
            className={classes.menuButton}
            onClick={() => history.push("/")}
          >
            DashBoard
          </Button>
          <Button
            className={classes.menuButton}
            onClick={() => history.push("/add")}
          >
            Add / Modify
          </Button>
          <Button
            className={classes.menuButton}
            onClick={() => history.push("/calculate")}
          >
            Calculate
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Nav;
