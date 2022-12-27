// import { useEffect } from 'react';
// to track information during redirects we need
// import { getRedirectResult } from 'firebase/auth';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { AuthenticationContainer } from './authentication.styles';

const AuthenticationComponent = () => {

	return (
		<AuthenticationContainer>
			<SignInForm />
			<SignUpForm />
		</AuthenticationContainer>
	);
}

export default AuthenticationComponent;
