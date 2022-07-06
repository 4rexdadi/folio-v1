// Imports
import { createSlice } from "@reduxjs/toolkit";

// Slice
const disableScrollingSlice = createSlice({
	name: "disableScrolling",
	initialState: {
		disableScrolling: false,
	},

	reducers: {
		setDisableScrolling: (state, action) => {
			state.disableScrolling = action.payload;
		},
	},
});

export const { setDisableScrolling } = disableScrollingSlice.actions;
export default disableScrollingSlice.reducer;
