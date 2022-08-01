const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "ORDER":
      return {
        ...state,
        recipes: action.payload,
      };
    case "NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "FILTER":
      const stateAll = state.allRecipes;
      const filter =
        action.payload === "All"
          ? stateAll
          : stateAll.filter((el) => el.diets.includes(action.payload));
      return {
        ...state,
        recipes: filter,
      };
    case "DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "POST":
      return {
        ...state,
      };
    case "DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "SET_DETAIL":
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
