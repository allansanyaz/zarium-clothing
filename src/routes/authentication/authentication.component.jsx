// import { useEffect } from 'react';
// to track information during redirects we need
// import { getRedirectResult } from 'firebase/auth';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import './authentication.styles.css.scss';

const AuthenticationComponent = () => {

	return (
		<div className={'authentication-container'}>
			<SignInForm />
			<SignUpForm />
		</div>
	);
}

export default AuthenticationComponent;
