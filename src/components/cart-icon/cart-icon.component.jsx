import { useSelector } from "react-redux";
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = ({ clickHandler }) => {

	// load the redux data
	const { totalCartItems } = useSelector(state => state.cart);

	return (
		<CartIconContainer
			onClick={clickHandler}
		>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount>{totalCartItems}</ItemCount>
		</CartIconContainer>
	)
}

export default CartIcon;
