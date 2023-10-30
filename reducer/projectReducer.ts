import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface paramsState {
    cartCount: number;
}

const initialState: paramsState = {
    cartCount: 0
}

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        setCartCount(state, action) {
            state.cartCount = action.payload;
        }
    }
})

export const { setCartCount } = paramsSlice.actions;

export const getCartCount = (state: AppState) => state.params.cartCount;

export default paramsSlice.reducer;