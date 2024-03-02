import types from "../types";

const init1 = {
  get_data: '',
};

export const get_data = (state = init1, action) => {
  switch (action.type) {
    case types.GetData:
      return action.payload;
    default:
      return {...state};
  }
};
