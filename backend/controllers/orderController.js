const { responseReturn } = require("../utils/response");
const formidable = require("formidable");
const moment = require("moment");
const {
    mongo: { ObjectId },
} = require("mongoose");
const customerOrderModel = require("../models/customerOrderModel");
const authOrderModel = require("../models/authOrderModel");
const cartModel = require("../models/cartModel");

class orderController {
    paymentCheck = async (id) => {
        try {
            const order = await customerOrderModel.findById(id);
            if (order.payment_status === "unpaid") {
                await customerOrderModel.findByIdAndUpdate(id, {
                    delivery_status: "cancelled",
                });
                await authOrderModel.updateMany(
                    {
                        orderId: id,
                    },
                    {
                        delivery_status: "cancelled",
                    }
                );
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    };

    place_order = async (req, res) => {
        const { price, products, shipping_fee, shippingInfo, userId } =
            req.body;
        // console.log(products);

        let authOrderData = [];

        let cartId = [];

        const tempDate = moment(Date.now()).format("LLL");

        let customerOrderProduct = [];

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products;

            for (let j = 0; j < pro.length; j++) {
                const tempCus = pro[j].productInfo;
                tempCus.quantity = pro[j].quantity;
                customerOrderProduct.push(tempCus);
                if (pro[j]._id) {
                    cartId.push(pro[j]._id);
                }
            }
        }

        try {
            const order = await customerOrderModel.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProduct,
                price: price + shipping_fee,
                payment_status: "unpaid",
                delivery_status: "pending",
                date: tempDate,
            });

            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products;
                const pri = products[i].price;
                const caregiverId = products[i].caregiverId;

                let storePro = [];
                for (let j = 0; j < pro.length; j++) {
                    const tempPro = pro[j].productInfo;
                    tempPro.quantity = pro[j].quantity;
                    storePro.push(tempPro);
                }

                authOrderData.push({
                    orderId: order.id,
                    caregiverId,
                    products: storePro,
                    price: pri,
                    payment_status: "unpaid",
                    delivery_status: "pending",
                    date: tempDate,
                });
            }

            await authOrderModel.insertMany(authOrderData);

            //order finish -> delete cart
            for (let k = 0; k < cartId.length; k++) {
                await cartModel.findByIdAndDelete(cartId[k]);
            }

            setTimeout(() => {
                this.paymentCheck(order.id);
            }, 50000);

            responseReturn(res, 200, {
                message: "Order Successfully",
                orderId: order.id,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    get_caregiver_orders = async (req, res) => {
        const { currentPage, parPage, searchValue } = req.query;
        const { caregiverId } = req.params;

        const skipPage = parseInt(parPage) * (parseInt(currentPage) - 1);

        try {
            const query = {
                caregiverId: caregiverId,
            };

            if (searchValue) {
                query.$text = { $search: searchValue };
            }

            const orders = await authOrderModel
                .find(query)
                .skip(skipPage)
                .limit(parseInt(parPage))
                .sort({ createdAt: -1 });

            const totalOrder = await authOrderModel.countDocuments(query);

            responseReturn(res, 200, { orders, totalOrder });
        } catch (error) {
            console.log(error.message);
        }
    };

    get_orderP_detail = async (req, res) => {
        const { orderId } = req.params;

        try {
            const orderDetails = await authOrderModel.aggregate([
                {
                    $match: { _id: new ObjectId(orderId) },
                },
                {
                    $lookup: {
                        from: "customerorders",
                        localField: "orderId",
                        foreignField: "_id",
                        as: "customerOrderDetails",
                    },
                },
                {
                    $unwind: "$customerOrderDetails",
                },
                {
                    $project: {
                        _id: 1,
                        sellerId: 1,
                        products: 1,
                        price: 1,
                        payment_status: 1,
                        delivery_status: 1,
                        shippingInfo: "$customerOrderDetails.shippingInfo",
                        date: 1,
                    },
                },
            ]);

            if (!orderDetails.length) {
                return res.status(404).json({ message: "Order not found" });
            }

            responseReturn(res, 200, { order: orderDetails[0] });
        } catch (error) {
            console.log("get seller details error: " + error.message);
            res.status(500).json({ message: "Server error" });
        }
    };
}

module.exports = new orderController();
