import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	cartHidden: true,
	toggleCartHidden: () => {},
	cartItems: [],
	addItemToCart: () => {},
	totalCartItems: 0,
});

export const CartProvider = ({ children }) => {
	const [cartHidden, setCartHidden] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [totalCartItems, setTotalCartItems] = useState(0);

	// define addItemToCart method
	const addItemToCart = (productToAdd) => {
		// check if product is already in cart
		const existingCartItem = cartItems.find(
			(cartItem) => cartItem.id === productToAdd.id
		);

		// if it is, increase quantity
		if (existingCartItem) {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === productToAdd.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			// if it is not, add it to cart
			// the below just deconstructs the existing cart items and adds the new one and makes a quantity of 1
			setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
		}
	};

	// ensure that the totalCartItems is updated when the cartItems array changes
	useEffect(() => {
		// only run when the cart items are not empty
		const totalCartItems = cartItems.reduce((accumulator, cartItem) => {
			// return the accumulator plus the quantity of the cart item
			return accumulator + cartItem.quantity;
			// set an initial value of 0 to ensure that this adds up the items
		}, 0);
		setTotalCartItems(totalCartItems);
		// ensure this runs only when the cartItems change
	}, [cartItems]);


	// set function to toggle the cartHidden state
	const toggleCartHidden = () => {
		setCartHidden(!cartHidden)
	};

	const value = { cartHidden, toggleCartHidden, cartItems, addItemToCart, totalCartItems };

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
};