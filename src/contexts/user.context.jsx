import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
// as the actual value you want to access
export const UserContext = createContext({
	// an empty state of an object that is not null will evaluate to true
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	// set up state to hold the current user
	const [currentUser, setCurrentUser] = useState(null);
	// add the state to the value
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		// note the the callback below passed is that of a function
		// in the firebase utils the output of the function is the user (return) which is then passed to the callback
		// the AuthStateChangedListerner return somes that is then passed as a parameter to the callback
		const unsubscribe =  onAuthStateChangedListener((user) => {
			if(user) {
				// if there is a user we want to create the authdocument
				createUserDocumentFromAuth(user);
			}
			// set the current user to the user returned from the callback
			setCurrentUser(user);
		});

		return unsubscribe
	}, []);

	// return the context provider
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/*
* The UserProvider is a component that wraps a component, and makes the context available to any child component that calls useContext.
* */