import authReducer from "./reducer/authReducer";
import caregiverReducer from "./reducer/caregiverReducer";
import categoryReducer from "./reducer/cateReducer";
import orderReducer from "./reducer/orderReducer";
import paymentReducer from "./reducer/paymentReducer";
import productReducer from "./reducer/productReducer";
import serviceReducer from "./reducer/serviceReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    caregiver: caregiverReducer,
    product: productReducer,
    service: serviceReducer,
    order: orderReducer,
    payment: paymentReducer,
};

export default rootReducer;
