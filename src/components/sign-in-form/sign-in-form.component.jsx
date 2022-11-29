import { useState } from 'react';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWirthEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		// set the form fields as the default form fields i.e. blank
		setFormFields(defaultFormFields);
	}

	// method to handle the change in the form fields
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	// create a log google user function
	const SignInWithGoogle = async () => {
		const response = await signInWithGooglePopup();
		// note the response can also be destructured
		// const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(response.user);
		console.log(userDocRef);
	}

	// method to handle the sign in with either email or google
	const handleSubmit = async (event) => {
		// prevent the default behaviour of the form
		event.preventDefault();

		try {
			// sign the user in using our firebase.utils script
			const response = await signInAuthUserWirthEmailAndPassword(email, password);
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
		<div className={'sign-in-container'}>
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
				<div className={'buttons-container'}>
					<Button
						type={"submit"}
						name={"Sign In"}
					>
						Sign In
					</Button>
					<Button
						buttonType={'google'}
						type={"submit"}
						name={"google"}
						onClick={SignInWithGoogle}
					>
						Google Sign In
					</Button>
				</div>

			</form>
		</div>
	)
}

export default SignInForm;
