import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <div className={styles.div}>
        <h1 className={styles.h1}>Bienvenidos a mi pagina de FOODS</h1>
      </div>
      <Link to="/home">
        <button className={styles.button}>Home</button>
      </Link>
    </div>
  );
}
