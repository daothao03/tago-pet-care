import HeaderPageCommon from "../components/HeaderPageCommon";
import Footer from "../layout/Footer";
import AllProduct from "./products/AllProduct";

const Products = () => {
    return (
        <div>
            <HeaderPageCommon
                title="PRODUCT"
                desc={"The Highest Possible Standards Of Pet Care"}
                showBookNow={true}
            />
            <AllProduct />
            <Footer />
        </div>
    );
};

export default Products;
