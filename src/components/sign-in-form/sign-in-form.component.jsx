import { useState } from 'react';
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import {
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.slice";

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	// define dispatch
	const dispatch = useDispatch();

	const resetFormFields = () => {
		// set the form fields as the default form fields i.e. blank
		setFormFields(defaultFormFields);
	}

	// method to handle the change in the form fields
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	// handle the sign in wit google button
	const SignInWithGoogle = async () => {
		// signInWithGooglePopup();
		dispatch(googleSignInStart());
		// note the response can also be destructured
		// const { user } = await signInWithGooglePopup();
	}

	// method to handle the sign in with either email or google
	const handleSubmit = async (event) => {
		// prevent the default behaviour of the form
		event.preventDefault();

		try {
			// sign the user in using our firebase.utils script
			dispatch(emailSignInStart({email, password}));
			// clear the input fields
			resetFormFields();
		} catch (error) {
			// lets use a switch statement to handle the errors
			switch (error.code) {
				case 'auth/user-not-found':
					alert("User does not exist");
					break;
				case 'auth/wrong-password':
					alert("Wrong password");
					break;
				case 'auth/invalid-email':
					alert("Invalid email");
					break;
				default:
					console.log("Could not sign in user due to:", error);
			}
		}
	}

	return (
		<SignInContainer>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={(event) => handleSubmit(event)}>

				<FormInput
					label={'Email'}
					onChange={handleChange}
					name={"email"}
					value={email}
				/>

				<FormInput
					label={"Password"}
					required type={"password"}
					onChange={handleChange}
					name={"password"}
					value={password}
				/>
				<ButtonsContainer>
					<Button
						type={"submit"}
						name={"Sign In"}
					>
						Sign In
					</Button>
					<Button
						buttonType={BUTTON_TYPE_CLASSES.google}
						type={"button"}
						onClick={SignInWithGoogle}
					>
						Google Sign In
					</Button>
				</ButtonsContainer>

			</form>
		</SignInContainer>
	)
}

export default SignInForm;
