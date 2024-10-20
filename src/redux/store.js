import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./InfoSlicer";
import fetchJobPost from "./JobPostSlice";
import authReducer from './authSlice';


export const store = configureStore({
  reducer: {
    info: infoReducer,
    jobPost: fetchJobPost, // The `reducer` key should contain an object with your reducers
    auth: authReducer,

  },
});
