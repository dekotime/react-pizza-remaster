import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza, SearchPizzaParams } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzaStatus',
    async (params) => {
        const { order, sortBy, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://629376807aa3e6af1a0bc580.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        return data;
    },
);
