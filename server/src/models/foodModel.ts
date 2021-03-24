import mongoose from "mongoose";

interface IFood {
  name: string;
  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

interface foodDoc extends mongoose.Document {
  name: string;
  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

interface foodModelInterface extends mongoose.Model<any> {
  build(attr: IFood): foodDoc;
}

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    default: 0,
  },
  fat: {
    type: Number,
    default: 0,
  },
  carbs: {
    type: Number,
    default: 0,
  },
});

foodSchema.statics.build = (attr: IFood) => {
  return new Food(attr);
};

const Food = mongoose.model<foodDoc, foodModelInterface>("Food", foodSchema);

export { Food };
