import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const getCategories = createAsyncThunk(
	"categories/getCategories",
	async () => {
		// get the categories and documents from firebase
		const categoriesFetchResult = await getCategoriesAndDocuments();
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
		  initialiseCategories: (state) => {
			  state.isPending = true;
			  state.categories = [];
		  },
		  setCategories: (state, action) => {
			  state.isPending = false;
			  state.categories = action.payload;
		  },
		  setError: (state, action) => {
			  state.isPending = false;
			  state.error = action.payload;
		  }
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
					state.error = action.payload;
					state.categories = [];
		      })
	  },
});

export const { initialiseCategories, setCategories, setError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
