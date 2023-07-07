import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { postsSlice } from "./posts/postsReducer";


const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [postsSlice.name]: postsSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
})