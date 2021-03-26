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
import DeleteIcon from "@material-ui/icons/Delete";

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
  deleteBtn: {
    "&:hover": {
      opacity: "0.8",
      cursor: "pointer",
      bacgkround: "rgba(0, 0, 0, 0.2)",
    },
  },
});
const Calculate = () => {
  const classes = useStyles();
  const [stats, setStats] = useState<IStats>({});
  const [food, setFood] = useState<string>("");
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/calculate", { food });
      setStats(res.data);
    } catch (err) {
      console.log(err.data);
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
        ></TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Calculate
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
                  <strong>Fat&nbsp;(g)</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Carbs&nbsp;(g)</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Protein&nbsp;(g)</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>{stats.calories}</TableCell>
              <TableCell>{stats.protein}</TableCell>
              <TableCell>{stats.carbs}</TableCell>
              <TableCell>{stats.fat}</TableCell>
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
