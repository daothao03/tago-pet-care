import authReducer from "./reducer/authReducer";
import caregiverReducer from "./reducer/caregiverReducer";
import cartReducer from "./reducer/cartReducer";
import homeReducer from "./reducer/homeReducer";

const rootReducer = {
    caregiver: caregiverReducer,
    auth: authReducer,
    home: homeReducer,
    cart: cartReducer,
};

export default rootReducer;
