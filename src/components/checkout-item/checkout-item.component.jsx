import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
	CheckoutItemContainer,
	ImageContainer,
	TextContainer,
	QuantityContainer,
	ArrowContainer,
	ValueContainer,
	RemoveButtonContainer
} from './checkout-item.styles';

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
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<TextContainer>{name}</TextContainer>
				<QuantityContainer>
					<ArrowContainer onClick={handleDecrementItem}>&#60;</ArrowContainer>
					<TextContainer>{quantity}</TextContainer>
					<ArrowContainer onClick={handleIncrementItem}>&#62;</ArrowContainer>
				</QuantityContainer>
				<TextContainer>${price}</TextContainer>
				<TextContainer>${total}</TextContainer>
				<RemoveButtonContainer onClick={handleRemoveItem}>
					&#10005;
				</RemoveButtonContainer>
			<div>
			</div>

		</CheckoutItemContainer>
	);
}
export default CheckoutItem;
