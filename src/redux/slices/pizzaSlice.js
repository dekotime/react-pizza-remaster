import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
        `https://629376807aa3e6af1a0bc580.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
});

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
