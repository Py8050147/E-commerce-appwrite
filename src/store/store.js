import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import cartSliceReducer from "./cartSlice"

 const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        cart: cartSliceReducer
    }
})

export default store