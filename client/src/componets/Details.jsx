import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsForID, setDetail } from "../actions";
import styles from "./Details.module.css";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(detailsForID(id));
    return () => {
      dispatch(setDetail());
    };
  }, [dispatch, id]);

  const allRecipes = useSelector((state) => state.details);

  return (
    <div className={styles.div}>
      {allRecipes.length > 0 ? (
        typeof allRecipes[0].id === "number" ? (
          <div>
            <li>
              <h1>{allRecipes[0].name}</h1>
            </li>
            <img src={allRecipes[0].image} alt="img not found" />
            <li>
              <h2>Tipo de plato: {allRecipes[0].dishTypes}</h2>
            </li>
            <li>
              <h3>Dietas: {allRecipes[0].diets}</h3>
            </li>
            <li>
              <h4>Nivel de comida saludable:{allRecipes[0].healthScore}</h4>
            </li>
            <li>
              <h5>
                Resumen: <br />
                {allRecipes[0].summary}
              </h5>
            </li>
          </div>
        ) 
        : (
          <div>
            <img src='https://st2.depositphotos.com/3682225/7526/v/950/depositphotos_75266221-stock-illustration-hot-meal-cup-steamy-bowl.jpg' width='300px' height='300px' />
            <h1>{allRecipes[0].name}</h1>
            <h1>{allRecipes[0].summary}</h1>
            <h4>{allRecipes[0].healthScore}</h4>
            <h1>{allRecipes[0].step}</h1>
            <h3>{allRecipes[0].diets.map(el=>el.name)}</h3>
          </div>
        )
      ) 
      : (
        <div className={styles.p}>
          <p>...Loading</p>
        </div>
      )}
    </div>
  );
}
