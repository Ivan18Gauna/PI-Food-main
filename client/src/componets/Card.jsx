import React from "react";
import styles from "./Card.module.css";

export default function Card({ image, name, diets }) {
  return (
    <div className={styles.conteiner}>
      <div className={styles.card}>
        <img src={image} alt="img not fount" width='280px' height='200px'/>
        <h3 className={styles.h}>{name}</h3>
        <h5 className={styles.h}>{diets.map((x) => `${x} -`)}</h5>
      </div>
    </div>
  );
}
