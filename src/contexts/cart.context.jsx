import { createContext, useState } from "react";

export const CartContext = createContext({
	cartHidden: true,
	toggleCartHidden: () => null,
});

export const CartProvider = ({ children }) => {
	const [cartHidden, setCartHidden] = useState(true);

	// set function to toggle the cartHidden state
	const toggleCartHidden = () => {
		setCartHidden(!cartHidden)
	};

	const value = { cartHidden, toggleCartHidden };

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
};