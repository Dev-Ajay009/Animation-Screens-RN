import store from "../store";
import types from "../types";



const {dispatch} = store;
export const set_data = data => {
  dispatch({
    type: types.GetData,
    payload: data,
  });
};
