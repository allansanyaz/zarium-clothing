import { createSelector } from "reselect";

// this will memoize the result of the selector
const categoriesReducer = (state) => {
	return state.categories
};
// the selector below can also be separately defined and inserted into the categories selector
export const categoriesSelector = createSelector(
	[categoriesReducer],
	(categoriesSlice) => {
		return categoriesSlice
	}
);