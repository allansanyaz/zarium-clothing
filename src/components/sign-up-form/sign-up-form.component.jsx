import { useState } from 'react';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.scss';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		// set the form fields as the default form fields i.e. blank
		setFormFields(defaultFormFields);
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		if(password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		// if the passwords match
		try {
			// let us try and authenticate the user, user can also be deconstructed
			const response = await createAuthUserWithEmailAndPassword(email, password);
			// add the user to the database
			await createUserDocumentFromAuth(response.user, { displayName });
			// reset the form fields
			resetFormFields();
		} catch (error) {
			// failed to sign the user in, they either already exist or there was an error
			if(error.code === 'auth/email-already-in-use') {
				// the user already exists
				alert("User already exists");
			} else {
				console.log(error);
			}
		}
	}

	return (
		<div className={"sign-up-container"}>
			<h2>Don't have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={(event) => handleSubmit(event)}>

				<FormInput
					label={"Display Name"}
					required type={"text"}
					onChange={handleChange}
					name={"displayName"}
					value={displayName}
				/>

				<FormInput
					label={"Email"}
					required type={"email"}
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

				<FormInput
					label={"Confirm Passowrd"}
					required type={"password"}
					onChange={handleChange}
					name={"confirmPassword"}
					value={confirmPassword}
				/>

				<Button type={"submit"}>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm;
