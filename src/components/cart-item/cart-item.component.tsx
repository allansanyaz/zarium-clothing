import { FC } from "react";
import {CartItemContainer, CartItemImage, ItemDetailsContainer, DataContainer} from './cart-item.styles';
import { ICartItem } from "../../types/types";

interface ICartItemProps {
	cartItem: ICartItem;
}

const CartItem: FC<ICartItemProps> = ({ cartItem }) => {
	// deconstruct the array
	const { name, imageUrl, price, quantity } = cartItem

	return (
		<CartItemContainer>
			<CartItemImage title={name} src={imageUrl} />
			<ItemDetailsContainer>
				<DataContainer>{name}</DataContainer>
				<DataContainer>{quantity} * ${price}</DataContainer>
			</ItemDetailsContainer>
		</CartItemContainer>
	);
};

export default CartItem;
