import { useDispatch, useSelector } from "react-redux";
import { toggleCartHidden } from "../../store/cart/cart.slice";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import the styled components
import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer, Logo } from './navigation.styles';
import { userSelector } from "../../store/user/user.selector";
import { cartSelector } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.slice";

const Navigation = () => {
	// Grab the information from redux
	const { currentUser } = useSelector(userSelector);
	const { cartHidden } = useSelector(cartSelector);
	// load the dispatch
	const dispatch = useDispatch();

	// handler for sign out
	const handleSignOut = () => {
		try {
			dispatch(signOutStart());
		} catch (error) {
			alert(`Could not sign out user: ${error.message}`);
		}
	}

	const onCartClick = () => {
			dispatch(toggleCartHidden());
	}

	return (
		<NavigationContainer>
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>

			<NavLinksContainer>
				<NavLink to="/categories">Shop</NavLink>
				<NavLink to="/contact">Contact</NavLink>
				{currentUser ?
					(
						<NavLink as="span" onClick={handleSignOut}>
							Sign Out
						</NavLink>
					) :
					(
						<NavLink to="/sign-in">Sign In</NavLink>
					)
				}

				<CartIcon
					clickHandler={onCartClick}
				/>
			</NavLinksContainer>
			{ !cartHidden && <CartDropdown /> }
		</NavigationContainer>
  );
}

export default Navigation;
