import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./storeReducer";
const store = configureStore({
    reducer:rootReducer,
    devTools : process.env.NODE_ENV !== 'production'
})
export type AppDispatch = typeof store.dispatch

export default store