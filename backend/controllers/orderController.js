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
                }, 1000);

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
}

module.exports = new orderController();
