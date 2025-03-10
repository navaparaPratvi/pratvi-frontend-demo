import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import productReducer from "./slices/productSlice";

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
