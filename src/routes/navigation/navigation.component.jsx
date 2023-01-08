import { useDispatch, useSelector } from "react-redux";
import { toggleCartHidden } from "../../store/cart/cart.slice";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
// import the styled components
import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer, Logo } from './navigation.styles';

const Navigation = () => {
	// Grab the information from redux
	const { currentUser } = useSelector(state => state.user);
	const { cartHidden } = useSelector(state => state.cart);
	// load the dispatch
	const dispatch = useDispatch();

	// handler for sign out
	const handleSignOut = async () => {
		try {
			await signOutUser();
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
