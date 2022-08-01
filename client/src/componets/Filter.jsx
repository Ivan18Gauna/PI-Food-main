import React from "react";
import { useDispatch } from "react-redux";
import { filterDiets } from "../actions";

export default function Filter() {
  const dispatch = useDispatch();

  function handle(e) {
    e.preventDefault();
    dispatch(filterDiets(e.target.value));
  }
  
  return (
    <div>
      <select onClick={(e) => handle(e)}>
        <option value="All">All</option>
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
    </div>
  );
}
