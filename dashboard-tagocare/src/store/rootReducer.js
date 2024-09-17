import authReducer from "./reducer/authReducer";
import caregiverReducer from "./reducer/caregiverReducer";
import categoryReducer from "./reducer/cateReducer";
import productReducer from "./reducer/productReducer";
import serviceReducer from "./reducer/serviceReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    caregiver: caregiverReducer,
    product: productReducer,
    service: serviceReducer,
};

export default rootReducer;
