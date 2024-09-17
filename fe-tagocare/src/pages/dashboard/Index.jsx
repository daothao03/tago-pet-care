import { RiShoppingCart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                <div className="flex justify-center items-center p-5 bg-[#fffcf2] rounded-md gap-5">
                    <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
                        <span className="text-xl text-green-800">
                            <RiShoppingCart2Fill />
                        </span>
                    </div>
                    <div className="flex flex-col justify-start items-start text-slate-600">
                        <h2 className="text-3xl font-bold">3</h2>
                        <span className="font-bold">Orders </span>
                    </div>
                </div>
                <div className="flex justify-center items-center p-5 bg-[#fffcf2] rounded-md gap-5">
                    <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
                        <span className="text-xl text-green-800">
                            <RiShoppingCart2Fill />
                        </span>
                    </div>
                    <div className="flex flex-col justify-start items-start text-slate-600">
                        <h2 className="text-3xl font-bold">3</h2>
                        <span className="font-bold">Pending Orders </span>
                    </div>
                </div>
                <div className="flex justify-center items-center p-5 bg-[#fffcf2] rounded-md gap-5">
                    <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
                        <span className="text-xl text-green-800">
                            <RiShoppingCart2Fill />
                        </span>
                    </div>
                    <div className="flex flex-col justify-start items-start text-slate-600">
                        <h2 className="text-3xl font-bold">4</h2>
                        <span className="font-bold">Cancelled Orders </span>
                    </div>
                </div>
            </div>

            <div className="bg-[#fffcf2] p-5 mt-5 rounded-md">
                <h2 className="font-pacifico text-[20px]">Recent Orders</h2>
                <div className="pt-4">
                    <div className="relative overflow-x-auto rounded-md">
                        <table className="w-full text-sm text-left text-black">
                            <thead className="text-xs  uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Payment Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Order Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-[#fffcf2] border-b">
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        #1
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        $30
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        pending
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        pending
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        <Link to={`/dashboard/order/details/1`}>
                                            <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                                                View
                                            </span>
                                        </Link>

                                        <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                                            Pay Now
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;
