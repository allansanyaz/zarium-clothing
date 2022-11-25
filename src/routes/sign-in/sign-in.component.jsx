import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	// create a log google user function
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		// note the response can also be destructured
		// const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(response.user);
	}

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>
				Sign In With Google Popup
			</button>
		</div>
	);
}

export default SignIn;
