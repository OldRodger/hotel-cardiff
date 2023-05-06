import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    discount: 0,
    tax: 20,
    service: 5,
    total: 25

}

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {
        calculateTotal(state, action) {
            // const {} = action.payload
            // state.total
            console.log(action.payload);
        }
    }
})

export const bookingSliceAction = bookingSlice.actions;
export default bookingSlice.reducer;