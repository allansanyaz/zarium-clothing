/*
Three types of buttons:
1. Default
2. Inverted
3. Google Sign In
*/

import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
	google: 'google-sign-in',
	inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    // below simply the object has just been indexed by the buttonType
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);


const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
	return(
		<CustomButton {...otherProps}>{children}</CustomButton>
	)
}

export default Button;
