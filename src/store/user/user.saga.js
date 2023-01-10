import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
	signInSuccess,
	signInFailed,
	signUpFailed,
	checkUserSession,
	googleSignInStart,
	emailSignInStart,
	emailSignUpStart,
	signOutStart,
	signOutSuccess,
	signOutFailed,
} from './user.slice';

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
	try {
		const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalData);
		// activate the sign in success method
		yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		// if there is no user do not proceed
		if(!userAuth) return;
		// use another saga to create the user document from auth
		yield call(getSnapShotFromUserAuth, userAuth);

	} catch (error) {
		yield put(signInFailed(error));
	}
}

// for googlePop-up
export function* onSignedInWithGooglePopUp() {
	try {
		// activate the up item and destructure the user object
		const { user } = yield call(signInWithGooglePopup);
		if(!user) return;
		yield call(getSnapShotFromUserAuth, user);
	} catch(error) {
		yield put(signInFailed(error));
	}
}

// for the email signin
export function* onSignedInWithEmail(action) {
	// this should handle our log in
	try {
		const { email, password } = action.payload;
		const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
		if(!user) return;
		yield call(getSnapShotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onSignedUpWithEmail(action) {
	try {
		const { email, password, displayName } = action.payload;
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		if(!user) return;
		yield call(getSnapShotFromUserAuth, user, { displayName });
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* onSignOut() {
	try{
		// sign out the user
		yield call(signOutUser);
		// dispatch the sign out success action
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(googleSignInStart, onSignedInWithGooglePopUp);
}

export function* onEmailSignInStart() {
	yield takeLatest(emailSignInStart, onSignedInWithEmail);
}

export function* onEmailSignUpStart() {
	yield takeLatest(emailSignUpStart, onSignedUpWithEmail);
}

export function* onSignOutStart() {
	yield takeLatest(signOutStart, onSignOut);
}

export function* onCheckUserSession() {
	yield takeLatest(checkUserSession, isUserAuthenticated);
}

export function* userSagas() {
	yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onEmailSignUpStart), call(onSignOutStart)]);
}