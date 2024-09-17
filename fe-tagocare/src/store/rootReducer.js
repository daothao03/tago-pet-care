import authReducer from "./reducer/authReducer";
import caregiverReducer from "./reducer/caregiverReducer";

const rootReducer = {
    caregiver: caregiverReducer,
    auth: authReducer,
};

export default rootReducer;
