import express, { Request, Response } from "express";
import { Food } from "../models/foodModel";

const router = express.Router();

interface calcualted {
  name: string;
  times: number;
}

function parseFood(foodStr: string): calcualted {
  const name: string = foodStr.substr(0, foodStr.indexOf("("));
  if (!name) return { name: foodStr, times: 1 };
  else {
    const times: number = parseFloat(foodStr.substr(foodStr.indexOf("(") + 1));
    return { name, times };
  }
}

router.post("/api/calculate", async (req: Request, res: Response) => {
  try {
    const nameTemp = req.body.food.split(",");
    const nameTimes = nameTemp.map((e: string) => parseFood(e));
    const names = nameTimes.map((e: calcualted) => e.name);
    const times = nameTimes.map((e: calcualted) => e.times);
    const food = await Food.find().where("name").in(names);

    const result = food.reduce(
      (acc, cur, idx) => ({
        ...acc,
        calories: acc.calories + cur.calories * times[idx],
        protein: acc.protein + cur.protein * times[idx],
        carbs: acc.carbs + cur.carbs * times[idx],
        fat: acc.fat + cur.fat * times[idx],
      }),
      {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      }
    );
    return res.status(200).json({ ...result });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export { router as calculateRouter };
