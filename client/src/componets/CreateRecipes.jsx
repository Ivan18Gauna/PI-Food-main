import React, { useEffect, useState } from "react";
import { post, diets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateRecipes.module.css";

function validate(input) {
  var error = {};
  if (!input.name) {
    error.name = "el campo nombre es obligatorio";
  }
  if (!input.summary) {
    error.summary = "el campo summary es obligatorio";
  }
  if (!input.healthScore) {
    error.healthScore = "el campo healthScore es obligatorio";
  }
  if (!input.step) {
    error.step = "el campo step es obligatorio";
  }
  return error;
}

export default function Create() {
  const dispatch = useDispatch();

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    step: "",
    diet: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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
      step: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(di) {
    setInput({
      ...input,
      diet: input.diet.filter((el) => el !== di),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input.step);
    dispatch(post(input));
    alert("la receta fue creada con exito");
    setInput({
      name: "",
      summary: "",
      healthScore: "",
      step: "",
      diet: [],
    });
  }
  // { name, summary, healthScore, step, diet }
  useEffect(() => {
    dispatch(diets());
  }, [dispatch]);

  return (
    <div className={styles.conteiner}>
      <label>Crea tu receta</label>
      <br />
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className={styles.error}>{error.name}</p>}
        </div>
        <br />
        <br />
        <div>
          <label>Resumen del plato</label>
          <br />
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {error.summary && <p className={styles.error}>{error.summary}</p>}
          <br />
        </div>
        <br />
        <br />
        <div>
        <label>Nivel de comdida saludable</label>
        <br />
        <input
          type="number"
          value={input.healthScore}
          name="healthScore"
          onChange={(e) => handleChange(e)}
        />
      {error.healthScore && <p className={styles.error}>{error.healthScore}</p>}
        </div>
        <br />
        <br />
        <div>
        <label>Paso a paso</label>
        <br />
        <input
          type="text"
          value={input.step}
          name="step"
          onChange={(e) => handleSteps(e)}
        />
        {error.step && <p className={styles.error}>{error.step}</p>}
        </div>
        <br />
        <br />
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
