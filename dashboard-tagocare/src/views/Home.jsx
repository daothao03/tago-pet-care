import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
    const { role } = useSelector((state) => state.auth);

    if (role.includes("caregiver")) {
        return <Navigate to={"/caregiver/dashboard"} replace />;
    } else if (role.includes("admin")) {
        return <Navigate to={"/admin/dashboard"} replace />;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default Home;
