/*
Three types of buttons:
1. Default
2. Inverted
3. Google Sign In
*/
import React from "react";
import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
	google = 'google-sign-in',
	inverted = 'inverted',
}

const getButton = (buttonType= BUTTON_TYPE_CLASSES.base): typeof BaseButton => (
    // below simply the object has just been indexed by the buttonType
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

type ButtonProps = {
    children: React.ReactNode;
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
    [otherProps: string]: any;
}

const Button = ({ children, buttonType, isLoading,...otherProps }: ButtonProps) => {
    if(buttonType === undefined) buttonType = BUTTON_TYPE_CLASSES.base;

    const CustomButton = getButton(buttonType);
	return(
		<CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner/> : children}
        </CustomButton>
	)
}

export default Button;
