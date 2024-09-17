import { useEffect, useState } from "react";
import "./App.css";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_info_user } from "./store/reducer/authReducer";

function App() {
    const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const routes = getRoutes();
        setAllRoutes([...allRoutes, routes]);
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(get_info_user(token));
        }
    }, [token]);

    return <Router allRoutes={allRoutes} />;
}

export default App;
