import { useEffect, useState } from "react";
import Product from "../../components/Product";
import { Range } from "react-range";
import { formatPrice } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
    price_range_product,
    query_products,
} from "../../store/reducer/homeReducer";
import Pagination from "../../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { add_to_cart, messageClear } from "../../store/reducer/cartReducer";
import toast from "react-hot-toast";

const AllProduct = () => {
    const dispatch = useDispatch();
    const { categories, priceRange, products, totalProduct, parPage } =
        useSelector((state) => state.home);

    const { userInfo } = useSelector((state) => state.auth);

    const { successMessage, errorMessage } = useSelector((state) => state.cart);

    const [sortPrice, setSortPrice] = useState("");
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const defaultLow = priceRange?.low || 0;
    const defaultHigh = priceRange?.high || 10000;
    const [state, setState] = useState({
        values: [defaultLow, defaultHigh],
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setState({
            values: [defaultLow, defaultHigh],
        });
    }, [priceRange]);

    //price range
    useEffect(() => {
        dispatch(price_range_product("product"));
    }, []);

    useEffect(() => {
        dispatch(
            query_products({
                lowPrice: state.values[0],
                highPrice: state.values[1],
                category,
                currentPage,
                sortPrice,
            })
        );
    }, [state.values[0], state.values[1], category, currentPage, sortPrice]);

    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            setCategory(categoryParam);
        }
    }, [searchParams]);

    const handleCategoryClick = (slug) => {
        setCategory(slug);
        setSearchParams({ category: slug });
        setCurrentPage(1);
    };

    const handleAddToCart = (productId) => {
        if (!userInfo) {
            navigate("/login");
        }

        const cartItem = {
            productId: productId,
            userId: userInfo.id,
            quantity: 1,
        };

        dispatch(add_to_cart(cartItem));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    return (
        <section className="container grid grid-cols-4 gap-[50px] mt-[100px]">
            <div className="col-span-1">
                <div className="py-2 flex flex-col gap-5">
                    <h2 className="text-3xl font-pacifico font-bold mb-3 ">
                        Price
                    </h2>

                    <Range
                        step={5}
                        min={defaultLow}
                        max={defaultHigh}
                        values={state.values}
                        onChange={(values) => setState({ values })}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                className="w-full h-[6px] bg-[#ed6436] rounded-full cursor-pointer"
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                className="w-[15px] h-[15px] bg-[#ed6436] rounded-full"
                                {...props}
                            />
                        )}
                    />

                    <span className="text-slate-800 font-semibold flex justify-between items-center text-[16px]">
                        <span>{formatPrice(state.values[0])}</span>
                        <span>{formatPrice(state.values[1])}</span>
                    </span>
                </div>

                <div className="py-2 flex flex-col gap-5">
                    <h2 className="text-3xl font-pacifico font-bold mb-3 mt-[50px]">
                        Category
                    </h2>

                    <ul>
                        {categories.map(
                            (c) =>
                                c.type === "product" && (
                                    <li
                                        // onClick={() => setCategory(c.slug)}
                                        onClick={() =>
                                            handleCategoryClick(c.slug)
                                        }
                                        key={c._id}
                                        className={`${
                                            category === c.slug
                                                ? "font-[800] text-orange-600 text-[18px]"
                                                : ""
                                        } text-[17px] cursor-pointer mb-4 py-1 border-b-2 flex gap-[30px]  items-center`}
                                    >
                                        <img
                                            src={c.image}
                                            alt=""
                                            className="w-[70px] h-[70px] object-cover rounded-md"
                                        />
                                        <span className="font-semibold">
                                            {c.name}
                                        </span>
                                    </li>
                                )
                        )}
                    </ul>
                </div>
            </div>

            <div className="col-span-3 ">
                <div className="flex justify-between items-center mb-6">
                    <span> {totalProduct} results</span>

                    <select
                        value={sortPrice}
                        onChange={(e) => setSortPrice(e.target.value)}
                        className="border rounded-full px-5 py-2 outline-none"
                        name="orderby"
                        aria-label="Shop order"
                    >
                        <option value="menu_order">Default sorting</option>

                        <option value="low-to-high">
                            Sort by price: low to high
                        </option>
                        <option value="high-to-low">
                            Sort by price: high to low
                        </option>
                    </select>
                </div>
                {/* <div className="grid grid-cols-3 gap-[20px]">
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className={`${p.stock <= 0 ? "bg-slate-500" : ""}`}
                        >
                            <Product
                                id={p._id}
                                images={p.images}
                                name={p.name}
                                price={p.price}
                                discount={p.discount}
                                category={p.category?.name}
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    ))}
                </div> */}
                <div className="grid grid-cols-3 gap-[20px]">
                    {products.map((p) => (
                        <div key={p._id} className="relative">
                            {p.stock <= 0 && (
                                <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold z-10">
                                    <span className="bg-black rounded-full py-2 px-4">
                                        Hết hàng
                                    </span>
                                </div>
                            )}
                            <Product
                                id={p._id}
                                images={p.images}
                                name={p.name}
                                price={p.price}
                                discount={p.discount}
                                category={p.category?.name}
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-9">
                    {totalProduct > parPage && (
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalItem={totalProduct}
                            parPage={parPage}
                            showItem={Math.floor(totalProduct / parPage)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AllProduct;
