import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

interface IFood {
  name: string;
  fat: number;
  calories: number;
  protein: number;
  carbs: number;
}

const useStyles = makeStyles({
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

const DashBoard = () => {
  const [food, setFood] = useState<IFood[]>([]);
  const classes = useStyles();
  const deleteFood = async (name: string) => {
    await axios.delete("/food", { data: { name } });
    const foodTemp: IFood[] = [...food];
    const newFood: IFood[] = foodTemp.filter((f) => f.name !== name);
    setFood(newFood);
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get("/food");
        setFood(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchFood();
  }, []);

  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>DashBoard</h1>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <strong>Food</strong>
              </TableCell>
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
            {food &&
              food.map((row: IFood) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      color="secondary"
                      className={classes.deleteBtn}
                      onClick={() => deleteFood(row.name)}
                    ></DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashBoard;
