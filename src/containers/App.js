import { Outlet } from "react-router-dom";
import Navigation from "../routes/navigation/navigation.component";

const App = () => {

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
