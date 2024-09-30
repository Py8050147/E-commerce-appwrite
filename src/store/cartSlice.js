import { createSlice } from "@reduxjs/toolkit";

// const initialState = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],  // Ensure items is initialized as an empty array
      },
    reducers: {
        addProduct(state, action) {
            const product = action.payload;
            state.items.push(product);
            // const existingProduct = state.find(item => item.id === product.id);
            // if (existingProduct) {
            //     existingProduct.quantity += product.quantity;
            // } else {
            //     state.push(product);
            // }
        },

        removeProduct(state, action) {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId); // The reducer filters the state to remove the product with the matching id and returns the updated state.

        },
    }
    })

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;