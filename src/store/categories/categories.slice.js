import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getCatergoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const getCategories = createAsyncThunk(
	"categories/getCategories",
	async () => {
		// get the categories and documents from firebase
		const categoriesFetchResult = await getCatergoriesAndDocuments();
		// return the categories
		return categoriesFetchResult;
	}
);

const INITIAL_STATE = {
	isPending: false,
	categories: [],
	error: null,
}

export const categoriesSlice = createSlice({
	  name: "categories",
	  initialState: INITIAL_STATE,
	  reducers: {
		  // no reducer method needed here just the async request
	  },
	  extraReducers: (builder) => {
		  builder
              .addCase(getCategories.pending, (state) => {
                    state.isPending = true;
		      })
		      .addCase(getCategories.fulfilled, (state, action) => {
                    state.isPending = false;
					state.categories = action.payload;
		      })
		      .addCase(getCategories.rejected, (state, action) => {
                    state.isPending = false;
					state.error = action.error.message;
					state.categories = [];
		      })
	  },
});

export default categoriesSlice.reducer;
