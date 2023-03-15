import {CartItemContainer, CartItemImage, ItemDetailsContainer, DataContainer} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
	// deconstruct the array
	const { name, imageUrl, price, quantity } = cartItem
	return (
		<CartItemContainer>
			<CartItemImage imageUrl={imageUrl} name={name} />
			<ItemDetailsContainer>
				<DataContainer>{name}</DataContainer>
				<DataContainer>{quantity} * ${price}</DataContainer>
			</ItemDetailsContainer>
		</CartItemContainer>
	);
};

export default CartItem;
