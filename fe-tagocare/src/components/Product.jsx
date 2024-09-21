import { formatPrice } from "../utils/utils";
import Rating from "./Rating";
import PropTypes from "prop-types";

const Product = ({
    images,
    category,
    name,
    price,
    discount,
    onAddToCart,
    id,
}) => {
    return (
        <div className="border rounded-[20px] pb-7">
            <img
                src={images?.[0]}
                alt=""
                className="w-full object-cover rounded-[20px]"
            />

            <div className="flex flex-col px-2 justify-center items-center gap-[10px]">
                <h4 className="mt-5 text-[13px]  font-bold uppercase text-[#ed6436]">
                    {category}
                </h4>
                <h2 className="text-[20px] text-center line-clamp-2 font-bold">
                    {name}
                </h2>
                <div className="flex">
                    <Rating ratings={3} />
                </div>
                <div>
                    {discount > 0 ? (
                        <div>
                            <span className="font-semibold text-red-300 text-[17px] mr-[20px]">
                                {formatPrice(price - price * (discount / 100))}
                            </span>
                            <span className="text-[16px]  line-through">
                                {formatPrice(price)}
                            </span>
                        </div>
                    ) : (
                        <span className="font-semibold text-red-300 text-[17px] mr-[20px]">
                            {formatPrice(price)}
                        </span>
                    )}
                </div>
                <div
                    onClick={() => {
                        onAddToCart(id);
                    }}
                    className="flex text-[13px] text-white cursor-pointer items-center gap-2 font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]"
                >
                    <button className="flex items-center">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
};

Product.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    id: PropTypes.string,
    onAddToCart: PropTypes.func,
};

export default Product;
