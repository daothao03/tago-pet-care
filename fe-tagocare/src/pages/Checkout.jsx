import { useState } from "react";
import HeaderPageCommon from "../components/HeaderPageCommon";

const Checkout = () => {
    const [res, setRes] = useState(false);

    const [state, setState] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const save = (e) => {
        e.preventDefault();
        const { name, address, phone } = state;
        if (name && address && phone) {
            setRes(true);
        }
    };

    const placeOrder = () => {};

    return (
        <>
            <HeaderPageCommon desc="Checkout" showBookNow={false} />

            <section>
                <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
                    <div className="w-full flex flex-wrap">
                        <div className="w-[67%] md-lg:w-full">
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-6 shadow-sm rounded-md">
                                    <h2 className="text-slate-600 font-pacifico text-[24px]  pb-3">
                                        Shipping Information
                                    </h2>
                                    {!res && (
                                        <>
                                            <form onSubmit={save}>
                                                <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                    <div className="flex flex-col gap-1 mb-2 w-full">
                                                        <label htmlFor="name">
                                                            Name
                                                        </label>
                                                        <input
                                                            onChange={
                                                                inputHandle
                                                            }
                                                            value={state.name}
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                            name="name"
                                                            id="name"
                                                            placeholder="Name"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1 mb-2 w-full">
                                                        <label htmlFor="address">
                                                            Address
                                                        </label>
                                                        <input
                                                            onChange={
                                                                inputHandle
                                                            }
                                                            value={
                                                                state.address
                                                            }
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                            name="address"
                                                            id="address"
                                                            placeholder="Address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                    <div className="flex flex-col gap-1 mb-2 w-full">
                                                        <label htmlFor="phone">
                                                            Phone
                                                        </label>
                                                        <input
                                                            onChange={
                                                                inputHandle
                                                            }
                                                            value={state.phone}
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                                                            name="phone"
                                                            id="phone"
                                                            placeholder="Phone"
                                                        />
                                                    </div>
                                                </div>

                                                <button className="mt-3 flex items-center gap-4 justify-center text-[20px]  text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out">
                                                    Save Change
                                                </button>
                                            </form>
                                        </>
                                    )}
                                    {res && (
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-slate-600 font-semibold pb-2">
                                                Deliver To {state.name}
                                            </h2>
                                            <p>
                                                <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                                                    Home
                                                </span>
                                                <span>
                                                    {state.phone}
                                                    {state.address}
                                                    {state.province}
                                                    {state.city} {state.area}
                                                </span>

                                                <span
                                                    onClick={() =>
                                                        setRes(false)
                                                    }
                                                    className="text-indigo-500 cursor-pointer"
                                                >
                                                    Change
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <table className="min-w-[90%] table-auto">
                                    <thead className="bg-[#ed6436] text-white text-center">
                                        <tr>
                                            <th className="px-4 py-2 w-[10%]"></th>
                                            <th className="px-4 py-2 w-[35%]">
                                                Product
                                            </th>
                                            <th className="px-4 py-2 w-[15%]">
                                                Price
                                            </th>
                                            <th className="px-4 py-2 w-[15%]">
                                                Quantity
                                            </th>
                                            <th className="px-4 py-2 w-[20%]">
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td className=" px-4 py-2">
                                                <img
                                                    src="https://pawsitive.bold-themes.com/coco/wp-content/uploads/sites/3/2018/09/product_06-320x320.jpg"
                                                    alt=""
                                                    className="w-[68px] h-[68px]"
                                                />
                                            </td>
                                            <td className=" px-4 py-2">
                                                Row 1, Cell 2
                                            </td>
                                            <td className=" px-4 py-2">
                                                Row 1, Cell 3
                                            </td>
                                            <td className=" px-4 py-2">1</td>
                                            <td className=" px-4 py-2">
                                                Row 1, Cell 4
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="w-[33%] md-lg:w-full">
                            <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                                    <h2 className="text-xl font-pacifico">
                                        Order Summary
                                    </h2>
                                    <div className="flex justify-between items-center">
                                        <span>Items Total (3) </span>
                                        <span>$30 </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Delivery Fee </span>
                                        <span>$30</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span>Total</span>
                                        <span className="text-lg text-[#059473]">
                                            $30
                                        </span>
                                    </div>

                                    <button
                                        disabled={res ? false : true}
                                        onClick={placeOrder}
                                        className="mt-3 flex items-center gap-4 justify-center text-[20px]  text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
