// Imports
import { createSlice } from "@reduxjs/toolkit";

// Slice
const colorSlice = createSlice({
	name: "color",
	initialState: {
		currentColor: null,
		currentTheme: "dark",
	},

	reducers: {
		setCurrentColor: (state, action) => {
			state.currentColor = action.payload;
		},
		setCurrentTheme: (state, action) => {
			state.currentTheme = action.payload;
		},
	},
});

export const { setCurrentColor, setCurrentTheme } = colorSlice.actions;
export default colorSlice.reducer;
