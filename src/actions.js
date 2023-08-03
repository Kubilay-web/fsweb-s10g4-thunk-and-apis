import axios from "axios";
import { toast } from "react-toastify";
export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";
export const FETCH_ANOTHER_REQUEST = 'FETCH_ANOTHER_REQUEST';

const apiUrl = "https://dog.ceo/api/breeds/image/random";


export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS }
}

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info }
}

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id }
}


const fetchAnotherSuccess = (data) => {
  return { type: FETCH_SUCCESS, payload: data };
};


const fetchAnotherLoading = () => {
  return { type: FETCH_LOADING };
};


const fetchAnotherError = (error) => {
  return { type: FETCH_ERROR, payload: error };
};


export const fetchAnotherRequest = () => ({
  type: FETCH_ANOTHER_REQUEST,
});


export const fetchAnother = () => async (dispatch) => {
  dispatch(fetchAnotherLoading());
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    dispatch(fetchAnotherSuccess(data));
    toast.success("New dog loaded!!");
  } catch (error) {
    dispatch(fetchAnotherError(error.message));
    toast.error("Failed to load!!");
  }
};




