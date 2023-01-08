import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext({
	cartHidden: true,
	toggleCartHidden: () => {},
	cartItems: [],
	addItemToCart: () => {},
	totalCartItems: 0,
	removeItemFromCart: () => {},
	totalCheckoutPrice: 0,
});

	// define addItemToCart method
	const addItemToCart = (cartItems, productToAdd) => {
		// check if product is already in cart
		const existingCartItem = cartItems.find(
			(cartItem) => cartItem.id === productToAdd.id
		);

		// if it is, increase quantity
		if (existingCartItem) {
			return(
				cartItems.map((cartItem) =>
					cartItem.id === productToAdd.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			// if it is not, add it to cart
			// the below just deconstructs the existing cart items and adds the new one and makes a quantity of 1
			return([...cartItems, { ...productToAdd, quantity: 1 }]);
		}
	};

	// logic for removing item from cart
	const removeItemFromCart = (cartItems, productToRemove, decrement=false) => {
		// check to see if the item is in the cart
		const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

		// if it exists then just remove from the cart ensuring that it will not go below 0
		if (existingCartItem.quantity) {
			switch (decrement) {
				case true:
					// reduce the quantity by 1 in the cart
					return(
						cartItems.map((cartItem) =>
							cartItem.id === productToRemove.id
								? { ...cartItem, quantity: cartItem.quantity - 1 }
								: cartItem
						)
					);
				case false:
					// remove the item from the cart
					return(cartItems.filter(cartItem => cartItem.id !== productToRemove.id));
				default:
					break;
			}
		} else {
			// set the cart items to the cart items that do not match the product to remove
			return cartItems;
		}
	};

export const CART_ACTION_TYPES = {
	TOGGLE_CART_HIDDEN: "TOGGLE_CART_HIDDEN",
	ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
	REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
	SET_TOTAL_CART_ITEMS: "SET_TOTAL_CART_ITEMS",
	SET_TOTAL_CHECKOUT_PRICE: "SET_TOTAL_CHECKOUT_PRICE",
	SET_CART_ITEMS: "SET_CART_ITEMS",
}

const INITIAL_STATE = {
	cartHidden: true,
	cartItems: [],
	totalCartItems: 0,
	totalCheckoutPrice: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch(type) {
		case CART_ACTION_TYPES.TOGGLE_CART_HIDDEN:
			return {
				...state,
				cartHidden: !state.cartHidden,
			}
		case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, payload),
			}
		case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
			const { productToRemove, decrement } = payload;
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, productToRemove, decrement),
			}
		case CART_ACTION_TYPES.SET_TOTAL_CART_ITEMS:
			return {
				...state,
				totalCartItems: payload,
			}
		case CART_ACTION_TYPES.SET_TOTAL_CHECKOUT_PRICE:
			return {
				...state,
				totalCheckoutPrice: payload,
			}
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload,
			}
		default:
			throw new Error(`Unhandled action type: ${type} for cart reducer`);
	}
};

export const CartProvider = ({ children }) => {
	// const [cartHidden, setCartHidden] = useState(true);
	// const [cartItems, setCartItems] = useState([]);
	// const [totalCartItems, setTotalCartItems] = useState(0);
	// const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);

	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

	const { cartHidden, cartItems, totalCartItems, totalCheckoutPrice } = state;
	const setCartHidden = () => dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART_HIDDEN });
	const setCartItems = (cartItems) => dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems });
	const addItemToCart = (productToAdd) => dispatch({ type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: productToAdd });
	const removeItemFromCart = (productToRemove, decrement=false) => dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload: { productToRemove, decrement } });
	const setTotalCartItems = (totalCartItems) => dispatch({ type: CART_ACTION_TYPES.SET_TOTAL_CART_ITEMS, payload: totalCartItems });
	const setTotalCheckoutPrice = (totalCheckoutPrice) => dispatch({ type: CART_ACTION_TYPES.SET_TOTAL_CHECKOUT_PRICE, payload: totalCheckoutPrice });

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