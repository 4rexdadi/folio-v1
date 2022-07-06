import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from "./cursorSlice";
import colorReducer from "./colorSlice";
import disableScrollingReducer from "./disableScrollingSlice";

const store = configureStore({
	reducer: {
		cursorSlice: cursorReducer,
		colorSlice: colorReducer,
		disableScrollingSlice: disableScrollingReducer,
	},
});
export default store;
