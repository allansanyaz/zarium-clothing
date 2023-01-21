import { createSelector } from "reselect";
import { RootState } from "../store";

// this will memoize the result of the selector
const categoriesReducer = (state: RootState) => {
	return state.categories
};
// the selector below can also be separately defined and inserted into the categories selector
export const categoriesSelector = createSelector(
	[categoriesReducer],
	(categoriesSlice) => {
		return categoriesSlice
	}
);