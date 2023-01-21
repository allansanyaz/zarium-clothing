import { useSelector } from "react-redux";
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';
import {cartSelector} from "../../store/cart/cart.selector";
import { CartClickHandler } from "../../types/types";

const CartIcon = ({ clickHandler }: CartClickHandler) => {

	// load the redux data
	const { totalCartItems } = useSelector(cartSelector);

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
