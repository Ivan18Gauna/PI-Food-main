import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import Ordenamiento from "./Order";
import SerchBar from "./SerchBar";
import Filter from "./Filter";
import styles from "./Home.module.css";

export default function Home() {
  const dispacth = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  //paginado
  const [pagina,setPagina] = useState(1)
  const [porPagina,setPorPagina] = useState(9)

  const maximo = allRecipes.length/ porPagina

  
  /////////

  useEffect(() => {
    if (allRecipes.length < 1) {
      dispacth(getRecipes());
    }
  }, [dispacth]);

  return (
    <div>
      <div className={styles.divNav}>
        <ul>
          <li>
            <SerchBar />
          </li>
          <li>
            <Filter />
          </li>
          <li>
            <Ordenamiento />
          </li>
          <li>
            <Link to="/create">
              <button className={styles.create}>Crear receta</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.cards}>
        {allRecipes.length > 0 ? (
          allRecipes.slice((pagina-1)*porPagina,(pagina-1)*porPagina+porPagina).map((el) => {
            return (
              <Link to={"/details/" + el.id}>
                <Card
                  name={el.name}
                  image={
                    el.image
                      ? el.image
                      : "https://st2.depositphotos.com/3682225/7526/v/950/depositphotos_75266221-stock-illustration-hot-meal-cup-steamy-bowl.jpg"
                  }
                  diets={typeof(el.id) === 'number' ? el.diets : el.diets.map(x=>x.name)}
                  key={el.id}
                />
              </Link>
            );
          })
        ) : (
          <div className={styles.loading}>
            <p>...Loading</p>
          </div>
        )}
      </div>
      <div>
        <Paginado
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
        />
      </div>
    </div>
  );
}
