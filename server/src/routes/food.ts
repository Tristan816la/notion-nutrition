import express, { Request, Response } from "express";
import { Food } from "../models/foodModel";

const router = express.Router();

router.get("/api/food", async (req: Request, res: Response) => {
  try {
    const food = await Food.find();
    return res.status(200).json(food);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post("/api/food", async (req: Request, res: Response) => {
  try {
    const { name, calories, fat, protein, carbs } = req.body;
    const food = Food.build({ name, calories, fat, protein, carbs });
    await food.save();
    return res.status(201).json(food);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put("/api/food", async (req: Request, res: Response) => {
  try {
    const { name, calories, fat, protein, carbs } = req.body;
    const food = await Food.findOne({ name });
    if (!food) throw Error("food doesn't exist");

    if (calories) food.set("calories", calories);
    if (fat) food.set("fat", fat);
    if (protein) food.set("protein", protein);
    if (carbs) food.set("cabrs", carbs);

    await food.save();
    return res.status(201).json(food);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/api/food", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const food = await Food.findOneAndDelete({ name });
    if (!food) throw Error("food doesn't exist");
    return res.status(200).json({ message: "Delete successful" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export { router as foodRouter };
