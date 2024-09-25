const { Schema, model } = require("mongoose");

const authSchema = new Schema(
    {
        orderId: {
            type: Schema.ObjectId,
            required: true,
        },
        caregiverId: {
            type: Schema.ObjectId,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        payment_status: {
            type: String,
            required: true,
        },
        // shippingInfo: {
        //     type: Object,
        //     required: true,
        // },
        delivery_status: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

authSchema.index(
    {
        orderId: "text",
        caregiverId: "text",
    },
    {
        weights: {
            orderId: 5,
            caregiverId: 4,
        },
    }
);

module.exports = model("authorOrders", authSchema);
