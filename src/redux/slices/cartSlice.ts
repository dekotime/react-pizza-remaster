import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((item) => item.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
