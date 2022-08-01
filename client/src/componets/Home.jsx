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
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const lastRecipes = currentPage * recipesPerPage;
  const firstRecipes = lastRecipes - recipesPerPage;
  const currentRecipes = allRecipes.slice(firstRecipes, lastRecipes);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
        {currentRecipes.length > 0 ? (
          currentRecipes.map((el) => {
            return (
              <Link to={"/details/" + el.id}>
                <Card
                  name={el.name}
                  image={el.image}
                  diets={
                    el.diets ? el.diets : el.diet.flat().map((x) => x.name)
                  }
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
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
