import { useEffect, useState } from "react";
import Service from "../../components/Service";
import { Range } from "react-range";
import { formatPrice } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
    price_range_product,
    query_services,
} from "../../store/reducer/homeReducer";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

const AllServices = () => {
    const dispatch = useDispatch();
    const { categories, priceRange, services, parPage, totalService } =
        useSelector((state) => state.home);

    const defaultLow = priceRange?.low || 0;
    const defaultHigh = priceRange?.high || 10000;
    const [state, setState] = useState({
        values: [defaultLow, defaultHigh],
    });

    const [sortPrice, setSortPrice] = useState("");
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setState({
            values: [defaultLow, defaultHigh],
        });
    }, [priceRange]);

    //price range
    useEffect(() => {
        dispatch(price_range_product("service"));
    }, []);

    useEffect(() => {
        dispatch(
            query_services({
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
                                c.type === "service" && (
                                    <li
                                        // onClick={() => setCategory(c.slug)}
                                        onClick={() =>
                                            handleCategoryClick(c.slug)
                                        }
                                        key={c._id}
                                        className={` text-[17px] cursor-pointer mb-4 py-1 border-b-2 flex gap-[30px]  items-center`}
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
            <div className="col-span-3 grid ">
                <div className="flex justify-between items-center mb-6">
                    <span> {totalService} results</span>

                    <select
                        className="border rounded-full px-5 py-2 outline-none"
                        name="orderby"
                        aria-label="Shop order"
                        value={sortPrice}
                        onChange={(e) => setSortPrice(e.target.value)}
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
                <div className="grid grid-cols-1 gap-[20px]">
                    {services.map((s) => (
                        <div key={s._id}>
                            <Service
                                images={s.images}
                                name={s.name}
                                desc={s.long_description}
                                price={s.price}
                                discount={s.discount}
                                short_desc={s.short_description}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-9">
                    {totalService > parPage && (
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalItem={totalService}
                            parPage={parPage}
                            showItem={Math.floor(totalService / parPage)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AllServices;
