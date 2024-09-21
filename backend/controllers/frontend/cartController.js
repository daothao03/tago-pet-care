const cartModel = require("../../models/cartModel");
const { responseReturn } = require("../../utils/response");
const {
    mongo: { ObjectId },
} = require("mongoose");

class cartController {
    add_to_cart = async (req, res) => {
        const { productId, userId, quantity } = req.body;
        try {
            const product = await cartModel.findOne({
                productId: productId,
                userId: userId,
            });
            if (product) {
                await cartModel.findOneAndUpdate(
                    { userId: userId, productId: productId },
                    { $inc: { quantity: 1 } },
                    { new: true }
                );
                responseReturn(res, 200, {
                    message: "Added to cart successfully",
                });
            } else {
                const product = await cartModel.create({
                    userId,
                    productId,
                    quantity,
                });
                responseReturn(res, 201, {
                    message: "Added To Card Successfully",
                    product,
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    get_cart = async (req, res) => {
        const co = 5; //admin: 5%
        const { userId } = req.params;

        try {
            const carts = await cartModel.aggregate([
                {
                    $match: {
                        userId: new ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
                {
                    $unwind: "$productDetails",
                },
                {
                    $lookup: {
                        from: "caregiverprofiles",
                        localField: "productDetails.caregiverId",
                        foreignField: "caregiverId",
                        as: "caregiverDetails",
                    },
                },
                {
                    $unwind: "$caregiverDetails",
                },
                {
                    $addFields: {
                        "productDetails.shopName": "$caregiverDetails.shopName",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        quantity: { $first: "$quantity" },
                        userId: { $first: "$userId" },
                        products: {
                            $push: "$productDetails",
                        },
                    },
                },
                // {
                //     $group: {
                //         _id: "$_id",
                //         userId: { $first: "$userId" },
                //         cartItems: {
                //             $push: {
                //                 product: "$productDetails",
                //                 caregiverProfile: "$caregiverDetails",
                //             },
                //         },
                //     },
                // },
            ]);

            // console.log(carts);

            let item_stock = 0;
            let item_outStock = 0;
            let calculatePrice = 0;

            const outOfStockProduct = carts.filter(
                (p) => p.products.length > 0 && p.products[0].stock < p.quantity
            );

            // for (let i = 0; i < outOfStockProduct.length; i++) {
            //     item_outStock += outOfStockProduct[i].quantity;
            // }

            const outOfStockProductIds = new Set();

            for (let i = 0; i < outOfStockProduct.length; i++) {
                outOfStockProductIds.add(outOfStockProduct[i].products[0]._id);
            }

            item_outStock = outOfStockProductIds.size;

            const stockProduct = carts.filter(
                (p) =>
                    p.products.length > 0 && p.products[0].stock >= p.quantity
            );

            const stockProductIds = new Set();
            for (let i = 0; i < stockProduct.length; i++) {
                const { quantity } = stockProduct[i];

                // item_stock += quantity;
                const productId = stockProduct[i].products[0]._id;
                stockProductIds.add(productId);

                const { discount, price } = stockProduct[i].products[0];
                if (discount !== 0) {
                    calculatePrice =
                        calculatePrice +
                        quantity *
                            (price - Math.floor((price * discount) / 100));
                } else {
                    calculatePrice = calculatePrice + quantity * price;
                }
            }
            item_stock = stockProductIds.size;

            //tổng tiền cho mỗi caregiver
            let p = [];

            let unique = [
                ...new Set(
                    stockProduct.map((p) =>
                        p.products[0].caregiverId.toString()
                    )
                ),
            ]; // Set: loai bo cac gia tri trung lap qua ===, lay ra caregiverId

            for (let i = 0; i < unique.length; i++) {
                let price = 0;
                for (let j = 0; j < stockProduct.length; j++) {
                    const tempProduct = stockProduct[j].products[0];

                    if (unique[i] === tempProduct.caregiverId.toString()) {
                        let pri = 0;

                        if (tempProduct.discount !== 0) {
                            pri =
                                tempProduct.price -
                                Math.floor(
                                    (tempProduct.price * tempProduct.discount) /
                                        100
                                );
                        } else {
                            pri = tempProduct.price;
                        }

                        pri = pri - Math.floor(pri * co) / 100; //sau khi tru 5%

                        price += pri * stockProduct[j].quantity;

                        p[i] = {
                            caregiverId: unique[i],
                            price,
                            shopName: tempProduct.shopName,
                            products: p[i]
                                ? [
                                      ...p[i].products,
                                      {
                                          _id: stockProduct[j]._id,
                                          quantity: stockProduct[j].quantity,
                                          productInfo: tempProduct,
                                      },
                                  ]
                                : [
                                      {
                                          _id: stockProduct[j]._id,
                                          quantity: stockProduct[j].quantity,
                                          productInfo: tempProduct,
                                      },
                                  ],
                        };
                    }
                }
            }
            // console.log(calculatePrice);
            responseReturn(res, 200, {
                carts: p,
                price: calculatePrice,
                item_stock,
                shipping_fee: 30000 * p.length,
                outOfStockProduct,
                item_outStock,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    delete_cart_item = async (req, res) => {
        const { productId } = req.params;

        try {
            await cartModel.findOneAndDelete({ productId: productId });
            responseReturn(res, 200, {
                message: "Deleted Cart Item Successfully",
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    inc_qty = async (req, res) => {
        const { cart_id } = req.params;

        try {
            const product = await cartModel.findById(cart_id);

            const { quantity } = product;

            await cartModel.findByIdAndUpdate(cart_id, {
                quantity: quantity + 1,
            });

            responseReturn(res, 200, {
                message: "Quantity Updated",
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    des_qty = async (req, res) => {
        const { cart_id } = req.params;

        try {
            const product = await cartModel.findById(cart_id);

            const { quantity } = product;

            await cartModel.findByIdAndUpdate(cart_id, {
                quantity: quantity - 1,
            });

            responseReturn(res, 200, {
                message: "Quantity Updated",
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}

module.exports = new cartController();
