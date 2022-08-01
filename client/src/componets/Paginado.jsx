import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNambers = [];

  for (let i = 1; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNambers.push(i);
  }

  return (
    <nav className={styles.nav}>
      {pageNambers &&
        pageNambers.map((n) => {
          return (
            <ul key={n}>
              <a onClick={()=>{paginado(n);}}>{n}</a>
            </ul>
          );
        })}
    </nav>
  );
}
