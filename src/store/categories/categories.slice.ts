import {createSlice, createAsyncThunk, SerializedError} from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { ICategories } from "../../types/types";

export const getCategories = createAsyncThunk(
	"categories/getCategories",
	async (dbName: string) => {
		// get the categories and documents from firebase
		const categoriesFetchResult = await getCategoriesAndDocuments(dbName);
		// return the categories
		return categoriesFetchResult as ICategories;
	}
);

export interface ICategoryState {
    isPending: boolean;
    categories: ICategories;
	error: SerializedError | null | string;
}

const INITIAL_STATE = {
	isPending: false,
	categories: {},
	error: null,
} as ICategoryState;

export const categoriesSlice = createSlice({
	  name: "categories",
	  initialState: INITIAL_STATE,
	  reducers: {
		  initialiseCategories: (state) => {
			  state.isPending = true;
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
					state.error = (action.payload) ? action.payload : action.error;
		      })
	  },
});

export const { initialiseCategories, setCategories, setError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
