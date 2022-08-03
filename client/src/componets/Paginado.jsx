import React, { useState } from "react";
import styles from "./Paginado.module.css";

// export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
export default function Paginado({ pagina, setPagina, maximo }) {
  const [input, setInput] = useState(1);

  const next = () => {
    if(input < Math.ceil(maximo)){
      setInput(input + 1);
      setPagina(pagina + 1);
    }
  };
  const prev = () => {
    if(input > 1){
    setInput(input - 1);
    setPagina(pagina - 1);
    }
  };
  return (
    <div>
      <button onClick={()=>prev()} className={styles.btn}>prev</button>
      <button>{input}</button>
      <button onClick={()=>next()} className={styles.btn}>next</button>
    </div>
  );
}
