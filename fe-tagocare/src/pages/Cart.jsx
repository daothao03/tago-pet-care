import { MdCancel } from "react-icons/md";
import HeaderPageCommon from "../components/HeaderPageCommon";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
    delete_cart_item,
    get_cart,
    inc_quantity_cart,
    messageClear,
    quantity_card_des,
} from "../store/reducer/cartReducer";
import { formatPrice } from "../utils/utils";
import toast from "react-hot-toast";
import ModalConfirm from "./../components/ModalConfirm";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const {
        carts,
        calculatePrice,
        shipping_fee,
        outOfStockProduct,
        item_stock,
        item_outStock,
        successMessage,
    } = useSelector((state) => state.cart);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(get_cart(userInfo.id));
    }, [userInfo]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            dispatch(get_cart(userInfo.id));
        }
    }, [successMessage]);

    const [deleteProductId, setDeleteProductId] = useState(null);

    const handleDelete = () => {
        if (deleteProductId) {
            dispatch(delete_cart_item(deleteProductId));
            setIsModalOpen(false);
            setDeleteProductId(null);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDeleteProductId(null);
    };

    const inc = (quantity, stock, cart_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(inc_quantity_cart(cart_id));
        }
    };

    const des = (quantity, cart_id) => {
        const temp = quantity - 1;
        if (temp !== 0 && temp >= 1) {
            dispatch(quantity_card_des(cart_id));
        }
    };

    const redirect = () => {
        navigate("/checkout", {
            state: {
                products: carts,
                price: calculatePrice,
                shipping_fee: shipping_fee,
                items: item_stock,
            },
        });
    };

    return (
        <>
            <HeaderPageCommon desc="Cart" showBookNow={false} />
            <div className="container mb-[50px] grid grid-cols-3 gap-[50px]">
                <div className="col-span-2">
                    <div>
                        <span className="font-bold text-[20px] pb-3 flex">
                            In Stock ({item_stock})
                        </span>
                        <table className="min-w-full table-auto">
                            <thead className="bg-[#ed6436] text-white text-center">
                                <tr>
                                    <th className="px-4 py-2 w-[5%]"></th>
                                    <th className="px-4 py-2 w-[10%]"></th>
                                    <th className="px-4 py-2 w-[35%]">
                                        Product
                                    </th>
                                    <th className="px-4 py-2 w-[15%]">Price</th>
                                    <th className="px-4 py-2 w-[15%]">
                                        Quantity
                                    </th>
                                    {/* <th className="px-4 py-2 w-[20%]">Subtotal</th> */}
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {carts.map((cart, index) => (
                                    <React.Fragment key={index + 1}>
                                        <tr>
                                            <th
                                                colSpan="6"
                                                className="text-[#ed6436] font-bold text-left pt-2"
                                            >
                                                {cart.shopName
                                                    ? cart.shopName
                                                    : "NaN"}
                                            </th>
                                        </tr>
                                        {cart.products.map((p) => (
                                            <tr key={p._id}>
                                                <td
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setDeleteProductId(
                                                            p.productInfo._id
                                                        );
                                                    }}
                                                    className=" px-4 py-2"
                                                >
                                                    <MdCancel className="text-[#ed6436] text-[30px] cursor-pointer" />
                                                </td>
                                                <td className=" px-4 py-2">
                                                    <img
                                                        src={
                                                            p.productInfo
                                                                ?.images?.[0]
                                                        }
                                                        alt=""
                                                        className="w-[68px] h-[68px] object-cover"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 line-clamp-2 h-[68px] flex items-center justify-center">
                                                    {p.productInfo?.name}
                                                </td>
                                                <td className=" px-4 py-2">
                                                    {p.productInfo?.discount > 0
                                                        ? formatPrice(
                                                              p.productInfo
                                                                  .price -
                                                                  (p.productInfo
                                                                      .price *
                                                                      p
                                                                          .productInfo
                                                                          ?.discount) /
                                                                      100
                                                          )
                                                        : formatPrice(
                                                              p.productInfo
                                                                  ?.price
                                                          )}
                                                </td>
                                                <td className=" px-4 py-2">
                                                    <div className="relative px-5 py-1 rounded-full border-[2px] border-[#ed6436]">
                                                        <button
                                                            onClick={() =>
                                                                des(
                                                                    p.quantity,

                                                                    p._id
                                                                )
                                                            }
                                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ed6436]"
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <input
                                                            className="mt-1  outline-none  w-[60px] text-center"
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            name="quantity"
                                                            value={p.quantity}
                                                            title="Qty"
                                                            size="4"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                inc(
                                                                    p.quantity,
                                                                    p
                                                                        .productInfo
                                                                        .stock,
                                                                    p._id
                                                                )
                                                            }
                                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ed6436]"
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                </td>

                                                {isModalOpen &&
                                                    deleteProductId ===
                                                        p.productInfo._id && (
                                                        <ModalConfirm
                                                            message="Are you sure you want to delete?"
                                                            onConfirm={
                                                                handleDelete
                                                            }
                                                            onCancel={
                                                                handleCancel
                                                            }
                                                        />
                                                    )}
                                            </tr>
                                        ))}

                                        <tr className="border-t-2">
                                            <th
                                                colSpan="4"
                                                className="font-semibold text-right pt-2  "
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                colSpan="2"
                                                className="font-bold text-[19px] text-right pt-2"
                                            >
                                                {cart.products.reduce(
                                                    (sum, product) =>
                                                        sum + product.quantity,
                                                    0
                                                )}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                colSpan="4"
                                                className="font-semibold text-right pt-2  "
                                            >
                                                SubTotal
                                            </th>
                                            <th
                                                colSpan="2"
                                                className="font-bold text-[19px] text-right pt-2"
                                            >
                                                {formatPrice(
                                                    cart.products.reduce(
                                                        (sum, p) => {
                                                            let priceAfterDiscount =
                                                                p.productInfo
                                                                    .price;

                                                            if (
                                                                p.productInfo
                                                                    .discount !==
                                                                0
                                                            ) {
                                                                priceAfterDiscount -=
                                                                    Math.floor(
                                                                        priceAfterDiscount *
                                                                            p
                                                                                .productInfo
                                                                                .discount
                                                                    ) / 100;
                                                            }

                                                            const totalPriceForProduct =
                                                                priceAfterDiscount *
                                                                p.quantity;

                                                            return (
                                                                sum +
                                                                totalPriceForProduct
                                                            );
                                                        },
                                                        0
                                                    )
                                                )}
                                            </th>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* out stock */}
                    <span className="font-bold text-[20px] pb-3 flex mt-[100px]">
                        Out Stock ({item_outStock})
                    </span>
                    <div className="relative ">
                        <div className="absolute inset-0 bg-black bg-opacity-50  z-10"></div>

                        <table className="min-w-full table-auto ">
                            <thead className="bg-[#ed6436] text-white text-center">
                                <tr>
                                    <th className="px-4 py-2 w-[5%]"></th>
                                    <th className="px-4 py-2 w-[10%]"></th>
                                    <th className="px-4 py-2 w-[35%]">
                                        Product
                                    </th>
                                    <th className="px-4 py-2 w-[15%]">Price</th>
                                    <th className="px-4 py-2 w-[15%]">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {outOfStockProduct.map((cart, index) => (
                                    <React.Fragment key={index + 1}>
                                        {cart.products.map((p) => (
                                            <tr key={p._id}>
                                                <td className=" px-4 py-2">
                                                    <MdCancel className="text-[#ed6436] text-[30px] cursor-pointer" />
                                                </td>
                                                <td className=" px-4 py-2">
                                                    <img
                                                        src={p.images?.[0]}
                                                        alt=""
                                                        className="w-[68px] h-[68px] object-cover"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 line-clamp-2 h-[68px] flex items-center justify-center">
                                                    {p.name}
                                                </td>
                                                <td className=" px-4 py-2">
                                                    {p.discount > 0
                                                        ? formatPrice(
                                                              p.price -
                                                                  (p.price *
                                                                      p?.discount) /
                                                                      100
                                                          )
                                                        : formatPrice(p.price)}
                                                </td>
                                                <td className=" px-4 py-2">
                                                    <input
                                                        className=" mt-1 px-5 py-1 border-[2px] border-[#ed6436] rounded-full"
                                                        type="number"
                                                        id="quantity"
                                                        step="1"
                                                        min="1"
                                                        max="10"
                                                        name="quantity"
                                                        value={cart.quantity}
                                                        title="Qty"
                                                        size="4"
                                                    ></input>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-span-1 ">
                    <form className="w-full mt-[30px]">
                        <input
                            className="w-full px-5 py-1 border-b-[2px] border-[#ed6436] rounded-full outline-none"
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
                            <span>{formatPrice(calculatePrice)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold mt-2 text-[17px]">
                                Shipping Fee
                            </span>
                            <span>{formatPrice(shipping_fee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold mt-2 text-[18px]">
                                Total
                            </span>
                            <span className="text-[22px] font-bold text-[#ed6436]">
                                {formatPrice(calculatePrice + shipping_fee)}
                            </span>
                        </div>

                        <button
                            onClick={redirect}
                            className="mt-3  flex items-center gap-4 justify-center  w-full text-white cursor-pointer font-bold border-[3px] px-4 rounded-full rounded-tl-3xl py-1 bg-[#ed6436] border-[#ed6436] hover:bg-white hover:text-black hover:border-[#ed6436] transition-all duration-500 ease-in-out"
                        >
                            <span className="hover:translate-x-3 flex items-center gap-3">
                                Proceed to checkout <FaArrowRight />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
