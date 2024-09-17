import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./InfoSlicer";

export const store = configureStore({
    reducer: {
      info: infoReducer, // The `reducer` key should contain an object with your reducers
    },
  });