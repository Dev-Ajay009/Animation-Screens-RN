import {configureStore} from '@reduxjs/toolkit';
import { get_data } from './reducers/LoginReducer';

export default configureStore({
  reducer: {
    GetData: get_data,
  },

});
