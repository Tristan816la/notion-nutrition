import {
  TextField,
  Button,
  Table,
  TableContainer,
  Paper,
  TableCell,
  makeStyles,
  TableRow,
  TableHead,
  TableBody,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";

interface IStats {
  calories?: number;
  fat?: number;
  protein?: number;
  carbs?: number;
}

const useStyles = makeStyles({
  text: {
    width: "300px",
  },
  table: {
    maxWidth: 750,
  },
  btn: {
    height: "35px",
  },
});
const Calculate = () => {
  const classes = useStyles();
  const [stats, setStats] = useState<IStats>({});
  const [food, setFood] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/calculate", { food });
      setStats(res.data);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Calculate</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <TextField
          className={classes.text}
          value={food}
          placeholder="Input your string with specific format"
          onChange={(e) => setFood(e.target.value)}
          error={!!err}
          helperText={!!err ? "Food invalid" : ""}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.btn}
        >
          Calculate
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setFood("");
            setStats({});
          }}
          className={classes.btn}
        >
          Reset
        </Button>
      </div>
      {stats && (stats.calories as number) > 0 ? (
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <strong>Calories</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Protein&nbsp;(g)</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Carbs&nbsp;(g)</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Fat&nbsp;(g)</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="right">{stats.calories}</TableCell>
              <TableCell align="right">{stats.protein?.toFixed(1)}</TableCell>
              <TableCell align="right">{stats.carbs?.toFixed(1)}</TableCell>
              <TableCell align="right">{stats.fat?.toFixed(1)}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Calculate;
