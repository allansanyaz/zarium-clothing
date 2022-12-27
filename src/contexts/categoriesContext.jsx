import { createContext, useState, useEffect } from "react";
import { getCatergoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
	categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
	// set up state to hold the current products
	const [categoriesMap, setCategories] = useState({});

	// ideally we want to populate this context with the products from the database
	// especially when the page loads

	// run the below only once so that it does not keep trying to add to DB
	useEffect(() => {
		// fetch the products from the js file and add to database
		// addCollectionAndDocuments('category', SHOP_DATA);
		const getCategoriesMap = async () => {
			const categoryMap = await getCatergoriesAndDocuments();
			// set the categoriesMap
			setCategories(categoryMap);
		}
		getCategoriesMap();
	}, []);

	// add the state to the value
	const value = { categoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	)

};