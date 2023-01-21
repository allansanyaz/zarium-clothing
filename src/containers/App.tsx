import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navigation from "../routes/navigation/navigation.component";
import { checkUserSession } from "../store/user/user.slice";
import { AppDispatch } from "../store/store";

const App = () => {
    // load the dispatch function from the useDispatch hook
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        // note the the callback below passed is that of a function
        // in the firebase utils the output of the function is the user (return) which is then passed to the callback
        // the AuthStateChangedListener return some that is then passed as a parameter to the callback
        dispatch(checkUserSession());

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
