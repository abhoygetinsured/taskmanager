import { createSlice } from "@reduxjs/toolkit";

export const Navslice = createSlice({
    name: 'Navslice',
    initialState: {
        value: 'Home'
    },
    reducers : {
        changeDir : (state, action) => {
            state.value = action.payload.dir;
        }
    }
})

export default Navslice.reducer;
export const { changeDir } = Navslice.actions;