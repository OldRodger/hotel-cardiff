import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        registerToken(state, action) {
            state.token = action.payload;
        },

        registerUser(state, action) {
            state.user = action.payload;
        }

    }
})

export const userSliceAction = userSlice.actions;
export default userSlice.reducer;