// Imports
import { createSlice } from "@reduxjs/toolkit";

// Slice
const cursorSlice = createSlice({
	name: "cursor",
	initialState: {
		cursorStyles: ["pointer", "hovered", "locked", "white"],
		cursorType: "",
	},
	reducers: {
		setCursorType: (state, action) => {
			state.cursorType = action.payload;
		},
	},
});

export const { setCursorType } = cursorSlice.actions;
export default cursorSlice.reducer;
