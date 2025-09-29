import { configureStore } from "@reduxjs/toolkit";
import userDeatils from "./userDeatils";

const store = configureStore({
  reducer: { app: userDeatils },
});

export default store;
