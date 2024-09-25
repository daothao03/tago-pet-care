import PropTypes from "prop-types";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectRoute = ({ route, children }) => {
    const { role, userInfo } = useSelector((state) => state.auth);

    if (role) {
        if (userInfo)
            if (route.role) {
                if (userInfo) {
                    if (userInfo.role.includes(route.role)) {
                        if (route.status) {
                            if (route.status === userInfo.status) {
                                return (
                                    <Suspense fallback={null}>
                                        {children}
                                    </Suspense>
                                );
                            } else {
                                if (userInfo.status === "pending") {
                                    return (
                                        <Navigate
                                            to="/caregiver/account-pending"
                                            replace
                                        />
                                    );
                                } else {
                                    return (
                                        <Navigate
                                            to="/caregiver/account-deactive"
                                            replace
                                        />
                                    );
                                }
                            }
                        } else {
                            if (route.visibility) {
                                if (
                                    route.visibility.some(
                                        (r) => r === userInfo.status
                                    )
                                ) {
                                    return (
                                        <Suspense fallback={null}>
                                            {children}
                                        </Suspense>
                                    );
                                } else {
                                    return (
                                        <Navigate
                                            to="/caregiver/account-pending"
                                            replace
                                        />
                                    );
                                }
                            } else {
                                return (
                                    <Suspense fallback={null}>
                                        {children}
                                    </Suspense>
                                );
                            }
                        }
                    } else {
                        return <Navigate to="/unauthorized" replace />;
                    }
                }
            } else {
                if (route.ability === "caregiver") {
                    return <Suspense fallback={null}>{children}</Suspense>;
                }
            }
    } else {
        return <Navigate to="/login" replace />;
    }
};

ProtectRoute.propTypes = {
    route: PropTypes.shape({
        role: PropTypes.string,
        status: PropTypes.string,
        visibility: PropTypes.arrayOf(PropTypes.string),
        ability: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
};
export default ProtectRoute;
