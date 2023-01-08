import { useDispatch } from "react-redux";
import { addItem, removeItem, decrementItem } from "../../store/cart/cart.slice";
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
	// load the dispatch method
	const dispatch = useDispatch();
	// deconstruct the product
	const { name, imageUrl, price, quantity, total } = product;

	// handlers for the buttons to increment, decrement and remove
	const handleRemoveItem = () => {
		// remove the item while ensuring that decrement is not set to true
		dispatch(removeItem(product));
	};

	const handleDecrementItem = () => {
		// remove the item while ensuring that decrement is set to true (i.e. reduce the quantity by 1)
		dispatch(decrementItem(product));
	}

	const handleIncrementItem = () => {
		// add the item to the cart
		dispatch(addItem(product));
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
