import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});