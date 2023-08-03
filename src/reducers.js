import {
GET_FAVS_FROM_LS,
FAV_ADD ,
FAV_REMOVE ,
FETCH_SUCCESS,
FETCH_LOADING ,
FETCH_ERROR ,
} from "./actions";



const initial = {
  dog: null,
  loading: false,
  error: null,
  favs: [],
};


export function myReducer(state = initial, action) {
  console.log(myReducer, action);
  switch (action.type) {

    case FETCH_SUCCESS:
      return {
        ...state,
        dog: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FAV_ADD:
      return {
        ...state,
        favorites: [...state.favs, action.payload],
      };
    case FAV_REMOVE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (fact) => fact._id !== action.payload
        ),
      };
  
    case GET_FAVS_FROM_LS:
      return state;

    default:
      return state;
  }
}


function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}


export default myReducer;