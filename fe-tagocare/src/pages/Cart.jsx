import { MdCancel } from "react-icons/md";
import HeaderPageCommon from "../components/HeaderPageCommon";
import { FaArrowRight } from "react-icons/fa";

const Cart = () => {
    return (
        <>
            <HeaderPageCommon desc="Cart" showBookNow={false} />
            <div className="container mb-[50px] grid grid-cols-3 gap-[50px]">
                <div className="col-span-2">
                    <table className="min-w-full table-auto">
                        <thead className="bg-[#ed6436] text-white text-center">
                            <tr>
                                <th className="px-4 py-2 w-[5%]"></th>
                                <th className="px-4 py-2 w-[10%]"></th>
                                <th className="px-4 py-2 w-[35%]">Product</th>
                                <th className="px-4 py-2 w-[15%]">Price</th>
                                <th className="px-4 py-2 w-[15%]">Quantity</th>
                                <th className="px-4 py-2 w-[20%]">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td className=" px-4 py-2">
                                    <MdCancel className="text-[#ed6436] text-[30px] cursor-pointer" />
                                </td>
                                <td className=" px-4 py-2">
                                    <img
                                        src="https://pawsitive.bold-themes.com/coco/wp-content/uploads/sites/3/2018/09/product_06-320x320.jpg"
                                        alt=""
                                        className="w-[68px] h-[68px]"
                                    />
                                </td>
                                <td className=" px-4 py-2">Row 1, Cell 2</td>
                                <td className=" px-4 py-2">Row 1, Cell 3</td>
                                <td className=" px-4 py-2">
                                    <input
                                        className="border mt-1 px-5 py-1 border-[2px] border-[#ed6436] rounded-full"
                                        type="number"
                                        id="quantity_66ccaa3e7621f"
                                        step="1"
                                        min="1"
                                        max="10"
                                        name="quantity"
                                        value="1"
                                        title="Qty"
                                        size="4"
                                    ></input>
                                </td>
                                <td className=" px-4 py-2">Row 1, Cell 4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className=" col-span-1 ">
                    <form className="w-full">
                        <input
                            className="w-full px-5 py-1 border-b-[2px] border-[#ed6436] rounded-full"
                            type="text"
                            id=""
                            name=""
                            placeholder="Coupon Code"
                        ></input>
                        <button className=" text-[13px] w-full mt-1 text-white cursor-pointer  font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436]">
                            Apply Coupon
                        </button>
                    </form>

                    <div className="mt-8">
                        <span className="font-pacifico text-[24px]">
                            Cart totals
                        </span>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold mt-2 text-[17px]">
                                Sub Total
                            </span>
                            <span>$35.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold mt-2 text-[17px]">
                                Shipping Fee
                            </span>
                            <span>$35.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold mt-2 text-[18px]">
                                Total
                            </span>
                            <span className="text-[22px] font-bold text-[#ed6436]">
                                $35.00
                            </span>
                        </div>

                        <button className="mt-3 flex items-center gap-4 justify-center text-[20px] w-full text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out">
                            Proceed to checkout <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
