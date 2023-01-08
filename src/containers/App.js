import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "../routes/navigation/navigation.component";

const App = () => {
    // load the dispatch function from the useDispatch hook
    const dispatch = useDispatch();

    const setCurrentUser = (user) => {
        dispatch({type: 'user/setCurrentUser', payload: user})
    }

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

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Outlet />
        </div>
    )
}

export default App;
