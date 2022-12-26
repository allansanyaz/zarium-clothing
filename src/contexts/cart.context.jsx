import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	cartHidden: true,
	toggleCartHidden: () => {},
	cartItems: [],
	addItemToCart: () => {},
	totalCartItems: 0,
	removeItemFromCart: () => {},
	totalCheckoutPrice: 0,
});

export const CartProvider = ({ children }) => {
	const [cartHidden, setCartHidden] = useState(true);
	const [cartItems, setCartItems] = useState([]);
	const [totalCartItems, setTotalCartItems] = useState(0);
	const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);

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

	// logic for removing item from cart
	const removeItemFromCart = (productToRemove, decrement=false) => {
		// check to see if the item is in the cart
		const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

		// if it exists then just remove from the cart ensuring that it will not go below 0
		if(existingCartItem.quantity) {
			switch (decrement) {
				case true:
					// reduce the quantity by 1 in the cart
					setCartItems(
						cartItems.map((cartItem) =>
							cartItem.id === productToRemove.id
								? { ...cartItem, quantity: cartItem.quantity - 1 }
								: cartItem
						)
					);
					break;
				case false:
					// remove the item from the cart
					setCartItems(cartItems.filter(cartItem => cartItem.id !== productToRemove.id));
					break;
				default:
					break;
			}
			// set the cart items to the cart items that do not match the product to remove
		}
	};

	// ensure that the totalCartItems is updated when the cartItems array changes
	// also compute the total price for each item in the cart
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

	useEffect(() => {
		// calculate the total price of each of the cart items
		const cartItemsWithTotals = cartItems.map(cartItem => {
			// deconstruct the cart item
			return {
				...cartItem,
				total: cartItem.quantity * cartItem.price
			}
		});
		// set the cart items to the cart items with totals
		setCartItems(cartItemsWithTotals);

		// eslint-disable-next-line
	}, [totalCartItems])

	useEffect(() => {
		// also compute the grand total of all the items
		const totalCheckOutPrice = cartItems.reduce((accumulator, cartItem) => {
			return accumulator + cartItem.total;
		}, 0)

		// add the total cart price to the state
		setTotalCheckoutPrice(totalCheckOutPrice)
	}, [cartItems])


	// set function to toggle the cartHidden state
	const toggleCartHidden = () => {
		setCartHidden(!cartHidden)
	};

	const value = { cartHidden, toggleCartHidden, cartItems, addItemToCart, totalCartItems, removeItemFromCart, totalCheckoutPrice };

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
};