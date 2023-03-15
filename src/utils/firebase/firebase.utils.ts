// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// set up the authentication
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	NextOrObserver,
	User,
} from 'firebase/auth';

// Just Because we have imported the user does not mean that they have been added to the database
// We have to import the firestore
import {
	getFirestore, // database instance
	doc, // will get a document instance
	getDoc, // when you want to access the data from the document then we use getDoc
	setDoc, // when you want to set the data
	collection, // allow us to get a collection reference instead of a document
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

// import the types
import {ICategoryItems, ICategories, AdditionalInformation} from "../../types/types";

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

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: ICategoryItems[]): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	/* Entries are transactions with represent a successful write operation.
	* If one fails then the db write must be undone. E.g. transferring money to two accounts
	* one has to be debited and the other credited (2 operations but one transaction).
	* if one fails the entire operation must be undone and accounts restored to normal*/

	/* batching is done to achieve this (batch writing) */
	// initialise the batch item
	const batch = writeBatch(db);

	// create set methods
	objectsToAdd.forEach((object: ICategoryItems ) => {
		// create the document but using the collection. doc is smart enough to know this
		const docRef = doc(collectionRef, object.title.toLowerCase());
		// tell it to populate the db
		batch.set(docRef, object);
	});
		// tell it to begin the population
		await batch.commit();
		// log the done message
		console.log('done');
}

export const getCategoriesAndDocuments = async (dbName: string): Promise<ICategories> => {
	// we need collection references
	const collectionRef = collection(db, dbName);
	// this will generate a query of the collectionRef
	const q = query(collectionRef);
	// get a snapshot from the object return above
	const querySnapshot = await getDocs(q);
	// below will give the data inside as an array, and the snapshots are the actual data
	const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
		// deconstruct the data from the snapshot
		const { title, items } = docSnapshot.data();
		accumulator[title.toLowerCase()] = items;
		// return the accumulator
		return accumulator
	}, {} as ICategories);

	return categoryMap as ICategories;
}

// testing the db methods
// function to get the information from the USER authentication
export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation={} as AdditionalInformation) => {
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
		} catch (error: any) {
			console.log('Error creating user', error.message);
		}
	}

	// return userDocRef;
	return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	// check and see that the email and password are not empty
	if(!email || !password) return;

	// try and create the user with the email and password
	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	// check and see that the email and password are not empty
	if(!email || !password) return;

	// this will return the user object if it worked
	return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
	// sign out the user use a try catch block when called
	return await signOut(auth);
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
	onAuthStateChanged(auth, callback);
}

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
}