import { takeLatest, all, call, put } from 'typed-redux-saga';
import { initialiseCategories, setCategories, setError } from "./categories.slice";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// getCategories will be fired on every specific request
export function* fetchCategoriesAsync() {
	try {
		// we don't use await in generators. yield will hold the application till it returns with something
		// anywhere we have a function we want to turn into an effect we use call
		// for call the first input is the method and the second the parameters
		const categories = yield* call(getCategoriesAndDocuments, 'categories');
		// put is a saga effect for creating actions and dispatching
		// so put is like dispatch and this will return the result to the saga flow
		yield* put(setCategories(categories));
	} catch (error) {
		yield* put(setError(error));
	}
}

export function* onFetchCategories() {
	// will take the latest initializeCategories then run and initialise the fetchCategoriesAsync
	yield* takeLatest(initialiseCategories, fetchCategoriesAsync);
}

export function* categoriesSaga() {
	yield* all([call(onFetchCategories)]);
}