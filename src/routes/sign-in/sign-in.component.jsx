// import { useEffect } from 'react';
// to track information during redirects we need
// import { getRedirectResult } from 'firebase/auth';

import SignUp from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

import {
	// auth,
	signInWithGooglePopup,
	// signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	// Run method when the view loads
	// Since we are returning to the page the signin component will remount thus the useEffect will run again
	// // When the use effect runs again we will check if there is a redirect result

	// useEffect(() => {
	// 	// get the response from the redirect
	// 	const redictResponse = async () => {
	// 		// fetch the redirect result response
	// 		const response = await getRedirectResult(auth);
	// 		// ensure the response is not null
	// 		if(response) {
	// 			const userDocRef = await createUserDocumentFromAuth(response.user);
	// 			console.log(userDocRef);
	// 		}
	// 	}
	// 	// call the async function
	// 	redictResponse();
	// }, []);

	// create a log google user function
	const logGooglePopUser = async () => {
		const response = await signInWithGooglePopup();
		// note the response can also be destructured
		// const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(response.user);
		console.log(userDocRef);
	}

	return (
		<div>
			<h1>Sign In Page</h1>

			<Button buttonType={'google'} onClick={logGooglePopUser}>
				Sign In With Google
			</Button>

			<SignUp />

			{/*<button onClick={signInWithGoogleRedirect}>*/}
			{/*	Sign In With Google Redirect*/}
			{/*</button>*/}

		</div>
	);
}

export default SignIn;
