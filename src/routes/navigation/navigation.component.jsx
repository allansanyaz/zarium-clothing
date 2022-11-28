import { Link } from "react-router-dom";
import { ReactComponent as ZariumLogo } from '../../assets/zarium.svg';
import './navigation.styles.scss';

const Navigation = () => {
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
					Sign In
				</Link>
			</div>
		</nav>
  );
}

export default Navigation;
