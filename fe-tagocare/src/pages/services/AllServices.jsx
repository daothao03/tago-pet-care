import { useState } from "react";
import Service from "../../components/Service";
import { Range } from "react-range";

const AllServices = () => {
    const defaultLow = 10000;
    const defaultHigh = 100000;
    const [state, setState] = useState({
        values: [defaultLow, defaultHigh],
    });

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
                        <span>{state.values[0]}</span>
                        <span>{state.values[1]}</span>
                    </span>
                </div>

                <div className="py-2 flex flex-col gap-5">
                    <h2 className="text-3xl font-pacifico font-bold mb-3 mt-[50px]">
                        Category
                    </h2>

                    <ul>
                        <li className="font-semibold text-[17px] mb-4 py-1 border-b-2">
                            Bath
                        </li>
                        <li className="font-semibold text-[17px] mb-4 py-1 border-b-2">
                            Spa
                        </li>
                        <li className="font-semibold text-[17px] mb-4 py-1 border-b-2">
                            Walk
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-span-3 grid ">
                <div className="flex justify-between items-center mb-6">
                    <span> 15 results</span>

                    <select
                        className="border rounded-full px-5 py-2 outline-none"
                        name="orderby"
                        aria-label="Shop order"
                    >
                        <option value="menu_order" selected="selected">
                            Default sorting
                        </option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="date">Sort by latest</option>
                        <option value="price">
                            Sort by price: low to high
                        </option>
                        <option value="price-desc">
                            Sort by price: high to low
                        </option>
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-[20px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i}>
                            <Service />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllServices;
