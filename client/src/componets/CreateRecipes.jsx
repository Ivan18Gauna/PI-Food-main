import React, { useEffect, useState } from "react";
import { post, diets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateRecipes.module.css";

export default function Create() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: [],
    diet: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    if (!input.diet.includes(e.target.value)) {
      setInput({
        ...input,
        diet: [...input.diet, e.target.value],
      });
    }
  }

  function handleSteps(e) {
    setInput({
      ...input,
      steps: [...input.steps, e.target.value],
    });
  }

  function handleDelete(di) {
    setInput({
      ...input,
      diet: input.diet.filter((el) => el !== di),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(post(input));
    alert("la receta fue creada con exito");
    setInput({
      name: "",
    summary: "",
    healthScore: "",
    steps: [],
    diet: [],
    });
  }
  useEffect(() => {
      dispatch(diets());
  },[dispatch]);

  return (
    <div className={styles.conteiner}>
      <label>Crea tu receta</label>
      <br />
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Nombre</label>
        <br />
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <label>Resumen del plato</label>
        <br />
        <input
          type="text"
          value={input.summary}
          name="summary"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <label>Nivel de comdida saludable</label>
        <br />
        <input
          type="number"
          value={input.healthScore}
          name="healthScore"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <br />
        <label>Paso a paso</label>
        <br />
        <input
          type="text"
          value={input.steps}
          name="steps"
          onChange={(e) => handleSteps(e)}
        />
        <br />
        <br />
        <select onChange={(e) => handleSelect(e)}>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto ovo vegetarian">Lacto-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescetarian</option>
          <option value="paleolithic">Paleo</option>
          <option value="primal">Primal</option>
          <option value="fodmap friendly">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
        </select>
        <br />
        <br />
        <button type="submit">Crear receta</button>
      </form>
      <div>
        {input.diet.map((el) => (
          <div>
            <button onClick={() => handleDelete(el)}>X</button>
            <p>{el}</p>
          </div>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
}
