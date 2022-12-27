import { useContext } from "react";
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";
// import the styled components
import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer, Logo } from './navigation.styles';

const Navigation = () => {
	// Grab the context
	const { currentUser } = useContext(UserContext);
	const { cartHidden, toggleCartHidden } = useContext(CartContext);

	// handler for sign out
	const handleSignOut = async () => {
		try {
			await signOutUser();
		} catch (error) {
			alert(`Could not sign out user: ${error.message}`);
		}
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
					clickHandler={toggleCartHidden}
				/>
			</NavLinksContainer>
			{ !cartHidden && <CartDropdown /> }
		</NavigationContainer>
  );
}

export default Navigation;
