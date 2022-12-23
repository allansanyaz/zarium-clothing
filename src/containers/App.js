import { Outlet } from "react-router-dom";
import Navigation from "../routes/navigation/navigation.component";
// import { ProductProvider } from "../contexts/product.context";

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
