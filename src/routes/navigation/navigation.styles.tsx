import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ZariumLogo from '../../assets/zarium.svg';

export const NavigationContainer = styled.nav`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
	height: 100%;
	width: 70px;
	padding: 5px;
`

export const NavLinksContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 5px;
`

export const NavLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
`

export const Logo = styled.img.attrs({
	src: ZariumLogo,
})`
	height: 80px;
  	width: 80px;
`;