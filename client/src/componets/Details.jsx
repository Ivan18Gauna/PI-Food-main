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
      ) : (
        <div className={styles.p}>
          <p>...Loading</p>
        </div>
      )}
    </div>
  );
}
