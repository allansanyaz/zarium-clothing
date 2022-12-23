import { useContext } from "react";
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { Link } from "react-router-dom";

import CartIcon from "../../components/cart-cion/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as ZariumLogo } from '../../assets/zarium.svg';
import './navigation.styles.scss';

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

	const clickHandler = () => {
		console.log("I have been clicked");
	}

	return (
		<nav className={'navigation'}>
			<Link className={'nav-link'} to="/">
				<div className={'logo-container'}>
					<ZariumLogo className={'logo'} />
				</div>
			</Link>
			<div className={'nav-links-container'}>
				<Link className={'nav-link'}  to="shop">
					Shop
				</Link>
				<Link className={'nav-link'}  to="contact">
					Contact
				</Link>
				<Link className={'nav-link'}  to="sign-in">
					{
						(!currentUser) ?
							(
								<span className={'nav-link'}>Sign In</span>
							)
							:
							(
								<span className={'nav-link'} onClick={handleSignOut}>Sign Out</span>
							)
					}
				</Link>
				<CartIcon
					clickHandler={toggleCartHidden}
				/>
			</div>
			{ !cartHidden && <CartDropdown /> }
		</nav>
  );
}

export default Navigation;
