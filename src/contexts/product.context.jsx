import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.json";

export const ProductContext = createContext({
	products: [],
	setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
	// set up state to hold the current products
	const [products, setProducts] = useState([]);
	// add the state to the value
	const value = { products, setProducts };

	// ideally we want to populate this context with the products from the database
	// especially when the page loads
	useEffect(() => {
		// fetch the products from the database
		// set the products to the products returned from the callback
		setProducts(SHOP_DATA);

	}, []);

	return (
		<ProductContext.Provider value={value}>
			{children}
		</ProductContext.Provider>
	)

};