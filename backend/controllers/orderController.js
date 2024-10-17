const { responseReturn } = require("../utils/response");
const formidable = require("formidable");
const moment = require("moment");
const {
    mongo: { ObjectId },
} = require("mongoose");
const customerOrderModel = require("../models/customerOrderModel");
const authOrderModel = require("../models/authOrderModel");
const cartModel = require("../models/cartModel");
const customerOrderServiceModel = require("../models/customerOrderServiceModel");
const authOrderServiceModel = require("../models/authOrderServiceModel");
const caregiverProfileModel = require("../models/caregiverProfileModel");
const myShopWallet = require("../models/myShopWallet");
const caregiverWallet = require("../models/caregiverWallet");

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

    get_caregiver_orders_service = async (req, res) => {
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

            const orders = await authOrderServiceModel
                .find(query)
                .skip(skipPage)
                .limit(parseInt(parPage))
                .sort({ createdAt: -1 });

            const totalOrderService =
                await authOrderServiceModel.countDocuments(query);

            responseReturn(res, 200, { orders, totalOrderService });
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

    get_orderS_detail = async (req, res) => {
        const { orderServiceId } = req.params;

        try {
            const orderDetails = await authOrderServiceModel.aggregate([
                {
                    $match: { _id: new ObjectId(orderServiceId) },
                },
                {
                    $lookup: {
                        from: "serviceorders", // Đảm bảo tên collection chính xác
                        localField: "orderServiceId",
                        foreignField: "_id",
                        as: "serviceOrdersDetail",
                    },
                },
                {
                    $unwind: {
                        path: "$serviceOrdersDetail",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        caregiverId: 1,
                        service: 1,
                        price: 1,
                        payment_status: 1,
                        service_status: 1,
                        address: "$serviceOrdersDetail.address",
                        petType: "$serviceOrdersDetail.petType",
                        travel_fee: "$serviceOrdersDetail.travel_fee",
                        startDate: "$serviceOrdersDetail.startDate",
                        endDate: "$serviceOrdersDetail.endDate",
                        startTime: "$serviceOrdersDetail.startTime",
                        endTime: "$serviceOrdersDetail.endTime",
                        serviceType: "$serviceOrdersDetail.serviceType",
                    },
                },
            ]);

            if (!orderDetails.length) {
                return res.status(404).json({ message: "Order not found" });
            }

            responseReturn(res, 200, { orderService: orderDetails[0] });
        } catch (error) {
            console.log("get order details error: " + error.message);
            res.status(500).json({ message: "Server error" });
        }
    };

    paymentServiceCheck = async (id) => {
        try {
            const order = await customerOrderServiceModel.findById(id);
            if (order.payment_status === "unpaid") {
                await customerOrderServiceModel.findByIdAndUpdate(id, {
                    service_status: "cancelled",
                });
                await authOrderServiceModel.findOneAndUpdate(
                    { orderServiceId: id },
                    { service_status: "cancelled" }
                );
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    };

    place_order_service = async (req, res) => {
        const {
            price,
            service,
            userId,
            petType,
            startTime,
            endTime,
            address,
            startDate,
            endDate,
            days,
            serviceType,
        } = req.body;

        try {
            const caregiverProfile = await caregiverProfileModel.findOne({
                caregiverId: service.caregiverId,
            });

            if (!caregiverProfile) {
                responseReturn(res, 400, {
                    message: "Caregiver not found",
                });
            }

            const numberOfEmployees = caregiverProfile.numberEmployee;

            // Kiểm tra xem đã có bao nhiêu booking trong cùng ngày và khung giờ
            const overlappingBookings =
                await authOrderServiceModel.countDocuments({
                    caregiverId: service.caregiverId,
                    startDate: { $lte: endDate },
                    endDate: { $gte: startDate },
                    startTime: { $lte: endTime },
                    endTime: { $gte: startTime },
                });

            // Nếu số booking trùng giờ vượt quá số lượng nhân viên thì từ chối đặt dịch vụ
            if (overlappingBookings >= numberOfEmployees) {
                responseReturn(res, 400, {
                    message:
                        "The caregiver is fully booked for the selected time, Please choose a different time",
                });
            } else {
                const co = 5;
                const orderService = await customerOrderServiceModel.create({
                    customerId: userId,
                    service,
                    price: price * days,
                    petType,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    serviceType,
                    address,
                    payment_status: "unpaid",
                    service_status: "pending",
                });

                await authOrderServiceModel.create({
                    orderServiceId: orderService.id,
                    caregiverId: service.caregiverId,
                    service,
                    price: price * days - Math.floor(price * days * co) / 100,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    payment_status: "unpaid",
                    service_status: "pending",
                });

                setTimeout(() => {
                    this.paymentServiceCheck(orderService.id);
                }, 24 * 60 * 60 * 1000);

                responseReturn(res, 200, {
                    message: "Order Successfully",
                    orderServiceId: orderService.id,
                    service: orderService.service,
                    price: orderService.price,
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    get_order_by_user = async (req, res) => {
        const { customerId, status } = req.params;

        try {
            let myOrdersService = [];
            if (status !== "all") {
                myOrdersService = await customerOrderServiceModel.find({
                    customerId: new ObjectId(customerId),
                    service_status: status,
                });
            } else {
                myOrdersService = await customerOrderServiceModel.find({
                    customerId: new ObjectId(customerId),
                });
            }

            responseReturn(res, 200, {
                myOrdersService,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    get_order_product_by_user = async (req, res) => {
        const { customerId, status } = req.params;

        try {
            let myOrdersProduct = [];
            if (status !== "all") {
                myOrdersProduct = await customerOrderModel.find({
                    customerId: new ObjectId(customerId),
                    delivery_status: status,
                });
            } else {
                myOrdersProduct = await customerOrderModel.find({
                    customerId: new ObjectId(customerId),
                });
            }

            responseReturn(res, 200, {
                myOrdersProduct,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    order_confirm = async (req, res) => {
        const { orderId } = req.params;
        try {
            await customerOrderServiceModel.findByIdAndUpdate(orderId, {
                payment_status: "paid",
            });
            await authOrderServiceModel.updateMany(
                { orderServiceId: new ObjectId(orderId) },
                {
                    payment_status: "paid",
                    service_status: "processing",
                }
            );

            const cuOrder = await customerOrderServiceModel.findById(orderId);
            const auOrder = await authOrderServiceModel.find({
                orderServiceId: new ObjectId(orderId),
            });

            const time = moment(Date.now()).format("l");
            const splitTime = time.split("/");

            await myShopWallet.create({
                amount: cuOrder.price,
                month: splitTime[0],
                year: splitTime[2],
            });

            for (let i = 0; i < auOrder.length; i++) {
                await caregiverWallet.create({
                    caregiverId: auOrder[i].caregiverId.toString(),
                    amount: auOrder[i].price,
                    month: splitTime[0],
                    year: splitTime[2],
                });
            }

            responseReturn(res, 200, { message: "success" });
        } catch (error) {
            console.log(error.message);
        }
    };
}

module.exports = new orderController();
