import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout-item.styles.scss';

const CheckoutItem = ({ product }) => {
	// load the context items
	const { addItemToCart, removeItemFromCart } = useContext(CartContext);
	// deconstruct the product
	const { name, imageUrl, price, quantity, total } = product;

	// handlers for the buttons to increment, decrement and remove
	const handleRemoveItem = () => {
		// remove the item while ensuring that decrement is not set to true
		removeItemFromCart(product);
	};

	const handleDecrementItem = () => {
		console.log('decrement');
		// remove the item while ensuring that decrement is set to true (i.e. reduce the quantity by 1)
		removeItemFromCart(product, true);
	}

	const handleIncrementItem = () => {
		// add the item to the cart
		addItemToCart(product);
	}

	return (
		<div className={'checkout-item-container'}>
			<div className={'image-container'}>
				<img src={imageUrl} alt={name} />
			</div>
				<span className={'name'}>{name}</span>
				<span className={'quantity'}>
					<span className={'arrow'} onClick={handleDecrementItem}>&#60;</span>
					<span className={'value'}>{quantity}</span>
					<span className={'arrow'} onClick={handleIncrementItem}>&#62;</span>
				</span>
				<span className={'price'}>${price}</span>
				<span className={'price'}>${total}</span>
				<div className={'remove-button'} onClick={handleRemoveItem}>
					&#10005;
				</div>
			<div>
			</div>

		</div>
	);
}
export default CheckoutItem;
