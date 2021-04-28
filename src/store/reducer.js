import { GET_CATEGORIES, SET_CATEGORY } from "./actions";

const initialState = {
  categories: null,
  targetCategory: null,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_CATEGORY:
      return { ...state, targetCategory: action.payload };
    default:
      return state;
  }
};
