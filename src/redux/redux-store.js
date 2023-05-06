import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user-slice";
import bookingSlice from "./slice/booking-slice";

const store = configureStore({
    reducer: {
        userSlice,
        bookingSlice
    }
})

export default store;