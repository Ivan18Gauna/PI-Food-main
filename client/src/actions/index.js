import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
   var info = await axios.get("/allrecipes");
//var info = await fetch("http://localhost:3001/allrecipes");
//  const x = await info.json()
return dispatch({
      type: "GET_RECIPES",
       payload: info.data,
      //payload: x,
    });
  };
}

export function getOrder(order) {
  return async function (dispatch) {
    var info = await axios.get(`/order/${order}`);
    return dispatch({
      type: "ORDER",
      payload: info.data,
    });
  };
}

export function getName(name) {
  return async function (dispatch) {
    var info = await axios.get(`/recipes?name=${name}`);
    return dispatch({
      type: "NAME",
      payload: info.data,
    });
  };
}

export function filterDiets(payload) {
  return ({
    type: "FILTER",
    payload
  });
}

export function detailsForID(id) {
  return async function (dispatch) {
    var info = await axios.get(`/recipes/${id}`);
    return dispatch({
      type: "DETAILS",
      payload: info.data,
    });
  };
}

export function setDetail (){
  return({
    type:'SET_DETAIL',
    payload:[]
  })
}

export function post(payload) {
  return async function (dispatch) {
    var info = await axios.post('/recipes',payload);
    console.log(info)
    return info
  };
}

export function diets() {
  return async function (dispatch) {
    var info = await axios.get('/diets');
    return dispatch({
      type: "DIETS",
      payload: info.data,
    });
  };
}