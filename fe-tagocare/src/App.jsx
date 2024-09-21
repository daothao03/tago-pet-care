import "./App.css";
import "react-multi-carousel/lib/styles.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./pages/dashboard/Index";
import Orders from "./pages/dashboard/Orders";
import ChangePassword from "./pages/dashboard/ChangePassword";
import Wishlist from "./pages/dashboard/Wishlist";
import OrderDetails from "./pages/dashboard/OrderDetails";
import Chat from "./pages/dashboard/Chat";
import RegisterCaregiver from "./pages/RegisterCaregiver";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_categories } from "./store/reducer/homeReducer";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_categories());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/product/details/:slug"
                    element={<ProductDetail />}
                />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/register-caregiver"
                    element={<RegisterCaregiver />}
                />
                <Route path="/dashboard" element={<ProtectUser />}>
                    <Route path="" element={<Dashboard />}>
                        <Route path="" element={<Index />} />
                        <Route path="my-orders" element={<Orders />} />
                        <Route
                            path="change-password"
                            element={<ChangePassword />}
                        />
                        <Route path="my-wishlist" element={<Wishlist />} />
                        <Route
                            path="order/details/:orderId"
                            element={<OrderDetails />}
                        />
                        <Route path="chat" element={<Chat />} />
                        <Route path="chat/:sellerId" element={<Chat />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
