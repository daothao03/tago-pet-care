import product from "../assets/images/product_13-300x300.jpg";
import Button from "./Button";
import Rating from "./Rating";

const Product = () => {
    return (
        <div className="border rounded-[20px] pb-7">
            <img
                src={product}
                alt=""
                className="w-full object-cover rounded-[20px]"
            />

            <div className="flex flex-col justify-center items-center gap-[10px]">
                <h4 className="mt-5 text-[12px] font-semibold text-[#ed6436]">
                    Fish
                </h4>
                <h2 className="text-[23px] font-bold">Air Dried Lamb</h2>
                <div className="flex">
                    <Rating ratings={3} />
                </div>
                <div>
                    <span className="font-semibold text-red-300 text-[17px] mr-[20px]">
                        $25.00
                    </span>
                    <span className="text-[16px]  line-through">$40.00</span>
                </div>
                <Button content="ADD TO CART" />
            </div>
        </div>
    );
};

export default Product;
