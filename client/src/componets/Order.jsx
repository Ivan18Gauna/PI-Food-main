import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getOrder} from "../actions";


export default function Ordenamiento() {
  const dispacth = useDispatch();
  
  function handle(e) {
    e.preventDefault();
    dispacth(getOrder(e.target.value))
  }

  return (
    <div>
      <select onChange={(e)=> handle(e)}>
      <option hidden selected>Ordenamientos</option>
        <option value="atoz">A-Z</option>
        <option value="ztoa">Z-A</option>
        <option value="scoremas">Mayor nivel de comida saludable</option>
        <option value="scoremenos">Menor nivel de comida saludable</option>
      </select>
    </div>
  );
}
