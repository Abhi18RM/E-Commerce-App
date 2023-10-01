import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Orders from "./pages/Orders";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category?" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
