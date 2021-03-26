import React, { FormEventHandler, useState } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { Formik, Field } from "formik";
import axios from "axios";

interface FormErrors {
  name?: string;
  calories?: string;
  protein?: string;
  fat?: string;
  carbs?: string;
}

const useStyles = makeStyles({
  input: {
    width: "500px",
  },
  submit: {
    maxWidth: "200px",
    minWidth: "200px",
    margin: "0 auto",
  },
});

const AddFood = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [modify, setModify] = useState(false);

  const handleTextSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const splited = text.split("	"); // This is not two space
    const nutritions = splited.slice(1).map((e) => parseFloat(e));
    const body = {
      name: splited[0],
      calories: nutritions[0],
      protein: nutritions[1],
      carbs: nutritions[2],
      fat: nutritions[3],
    };
    if (!modify) await axios.post("/food", body);
    else await axios.put("/food", body);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {!modify ? <h1>Add Food</h1> : <h1>Modify Food</h1>}
        <select
          style={{ width: "100px" }}
          onChange={(e) => setModify(e.target.value === "Modify Food")}
        >
          <option>Add Food</option>
          <option>Modify Food</option>
        </select>

        <form
          onSubmit={handleTextSubmit}
          style={{ display: "flex", gap: "10px" }}
        >
          <TextField
            className={classes.input}
            placeholder="Copy your notion table row here [name calories protein carbs fat]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></TextField>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <div>
        <h1>Or</h1>
        <Formik
          initialValues={{
            name: "",
            calories: "",
            protein: "",
            fat: "",
            carbs: "",
          }}
          validate={(values: any) => {
            const errors: FormErrors = {};
            for (let key in values as Array<string>) {
              if (values[key] === "") {
                // @ts-ignore: Unreachable code error
                errors[key] = "Cannot be empty";
              }
            }
            if (values.calories < 0)
              errors.calories = "Must be larger than zero";
            if (values.carbs < 0) errors.carbs = "Must be larger than zero";
            if (values.fat < 0) errors.fat = "Must be larger than zero";
            if (values.protein < 0) errors.protein = "Must be larger than zero";
            return errors;
          }}
          onSubmit={(values) => console.log(values)}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleSubmit, errors }) => (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              <Field
                as={TextField}
                placeholder="Name"
                name="name"
                helperText={errors.name}
                error={!!errors.name}
              ></Field>
              <Field
                as={TextField}
                placeholder="Calories"
                name="calories"
                type="number"
                helperText={errors.calories}
                error={!!errors.calories}
                min={1}
              ></Field>
              <Field
                as={TextField}
                placeholder="Protein"
                name="protein"
                type="number"
                min={0}
                helperText={errors.protein}
                error={!!errors.protein}
              ></Field>
              <Field
                as={TextField}
                placeholder="Carbs"
                name="carbs"
                min={0}
                type="number"
                helperText={errors.carbs}
                error={!!errors.carbs}
              ></Field>
              <Field
                as={TextField}
                placeholder="Fat"
                name="fat"
                type="number"
                min={0}
                helperText={errors.fat}
                error={!!errors.fat}
              ></Field>
              <Button
                color="secondary"
                variant="contained"
                className={classes.submit}
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddFood;
