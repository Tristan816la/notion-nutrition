import express from "express";
import mongoose from "mongoose";
import { foodRouter } from "./routes/food";
import { calculateRouter } from "./routes/calculate";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(foodRouter);
app.use(calculateRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is litening on port ${PORT}`);
});

mongoose.connect(
  process.env.DB_CONNECT as string,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);
