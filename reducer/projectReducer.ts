import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { paramsState } from '@/model/customType';

const initialState: paramsState = {
    cartItem: []
}

export const paramsSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        setCartItem(state, action) {
            state.cartItem = action.payload;
        }
    }
})

export const { setCartItem } = paramsSlice.actions;

export const getCartItem = (state: AppState) => state.params.cartItem;

export default paramsSlice.reducer;