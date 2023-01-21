import { createSlice } from '@reduxjs/toolkit';
import { ICategoryItem } from "../../types/types";

interface ICartItem extends ICategoryItem {
	quantity: number;
	total: number;
}

// helper functions for the reducer
const addItemToCart = (cartItems: ICartItem[], productToAdd: ICartItem): ICartItem[] => {
	// check if product is already in cart
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// if it is, increase quantity
	if (existingCartItem) {
		return(
			cartItems.map((cartItem) =>
				cartItem.id === productToAdd.id
					? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.price }
					: cartItem
			)
		);
	} else {
		// if it is not, add it to cart
		// the below just deconstructs the existing cart items and adds the new one and makes a quantity of 1
		return([...cartItems, { ...productToAdd, quantity: 1, total: productToAdd.price }]);
	}
};

const removeItemFromCart = (cartItems: ICartItem[], productToRemove: ICartItem, decrement: boolean=false): ICartItem[] => {
	// check to see if the item is in the cart
	const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id) as ICartItem;

	// if it exists then just remove from the cart ensuring that it will not go below 0
	if (existingCartItem.quantity) {
		switch (decrement) {
			case true:
				// reduce the quantity by 1 in the cart
				return(
					cartItems.map((cartItem) =>
						cartItem.id === productToRemove.id
							? { ...cartItem, quantity: cartItem.quantity - 1, total: (cartItem.quantity - 1) * cartItem.price }
							: cartItem
					)
				) as ICartItem[];
			case false:
				// remove the item from the cart
				return(cartItems.filter(cartItem => cartItem.id !== productToRemove.id)) as ICartItem[];
			default:
				break;
		}
	}
	// set the cart items to the cart items that do not match the product to remove
	return cartItems;
};

type QuantityPrice = {
	totalQuantity: number;
	totalPrice: number;
}

const totalQuantityAndPrice = (cartItems: ICartItem[]): QuantityPrice => {
	// get the total quantity of items in the cart
	const totalQuantity = cartItems.reduce((accumulatedQuantity, cartItem) => {
		return accumulatedQuantity + cartItem.quantity;
	}, 0);

	// get the total price of items in the cart
	const totalPrice = cartItems.reduce((accumulatedPrice, cartItem) => {
		return accumulatedPrice + cartItem.total;
	}, 0);

	return { totalQuantity, totalPrice };
};

interface ICartState {
	cartHidden: boolean;
	cartItems: ICartItem[] | [];
	totalCartItems: number;
	totalCartPrice: number;
}

const INITIAL_STATE = {
	cartHidden: true,
	cartItems: [],
	totalCartItems: 0,
	totalCartPrice: 0,
} as ICartState;

export const cartSlice = createSlice({
	name: "cart",
	initialState: INITIAL_STATE,
	reducers: {
		toggleCartHidden: (state) => {
			state.cartHidden = !state.cartHidden;
		},
		addItem: (state, action) => {
			state.cartItems = addItemToCart(state.cartItems, action.payload);
			// compute the quantity and price of the cart
			const quantityAndPrice = totalQuantityAndPrice(state.cartItems);
			state.totalCartItems = quantityAndPrice.totalQuantity;
			state.totalCartPrice = quantityAndPrice.totalPrice;
		},
		removeItem: (state, action) => {
			state.cartItems = removeItemFromCart(state.cartItems, action.payload) as ICartItem[];
			// compute the quantity and price of the cart
			const quantityAndPrice = totalQuantityAndPrice(state.cartItems);
			state.totalCartItems = quantityAndPrice.totalQuantity;
			state.totalCartPrice = quantityAndPrice.totalPrice;
		},
		decrementItem: (state, action) => {
			state.cartItems = removeItemFromCart(state.cartItems, action.payload, true) as ICartItem[];
			// compute the quantity and price of the cart
			const quantityAndPrice = totalQuantityAndPrice(state.cartItems);
			state.totalCartItems = quantityAndPrice.totalQuantity;
			state.totalCartPrice = quantityAndPrice.totalPrice;
		},
        clearCart: (state) => {
            state.cartItems = [];
            state.totalCartItems = 0;
            state.totalCartPrice = 0;
        },
	},
});

export const { toggleCartHidden, addItem, removeItem, decrementItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
