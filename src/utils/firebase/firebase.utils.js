// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// set up the authentication
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
} from 'firebase/auth';

// Just Because we have imported the user does not mean that they have been added to the database
// We have to import the firestore
import {
	getFirestore, // database instance
	doc, // will get a document instance
	getDoc, // when you want to access the data from the document then we use getDoc
	setDoc, // when you want to set the data
} from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCKhFCff54NEylyOrKwUvYtEL3Fg9B2M80",
	authDomain: "zarium-clothing-db.firebaseapp.com",
	projectId: "zarium-clothing-db",
	storageBucket: "zarium-clothing-db.appspot.com",
	messagingSenderId: "293425814146",
	appId: "1:293425814146:web:25851c4bed74e4e144729b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialise a provider from Google
const googleProvider = new GoogleAuthProvider();
// set the custom parameters for the provider
googleProvider.setCustomParameters({
	prompt: 'select_account'
})

// get the authentication instance
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// testing out the redirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


// we need to create the DB
export const db = getFirestore(firebaseApp);

// testing the db methods
// function to get the information from the USER authentication
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
	// test to see if there is an existing document reference

	const userDocRef = doc(db, 'users', userAuth.uid);
	// console.log(userDocRef);

	// get the snapshot of the users data
	const userSnapshot = await getDoc(userDocRef);
	// log the Snapshot and
	// console.log(userSnapshot);
	// Check to see if it exists using the exists property
	// console.log(userSnapshot.exists());

	// check and see if the user data exists do nothing end return the userDocRef

	// if the data does not exist then we want to create the data
	// set the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		// data does not exist
		// get the displayName and email from the userAuth
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			})
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}

	return userDocRef;
}

export const createAuthUserWirthEmailAndPassword = async (email, password) => {
	// check and see that the email and password are not empty
	if(!email || !password) return;

	// try and create the user with the email and password
	return await createUserWithEmailAndPassword(auth, email, password);
}
